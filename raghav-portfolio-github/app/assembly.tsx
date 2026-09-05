'use client';

import { useEffect, useRef, useState } from 'react';
import type { Group, MeshStandardMaterial, Material, BufferGeometry } from 'three';
import { Expand, RotateCcw, Move } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Assembly() {
  const viewport = useRef<HTMLDivElement>(null);
  const settings = useRef({ exploded: false, rotate: true });
  const resetView = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [rotate, setRotate] = useState(true);
  useEffect(() => { settings.current = { exploded, rotate }; }, [exploded, rotate]);

  useEffect(() => {
    let stopped = false;
    let dispose = () => {};
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { if (media.matches) { settings.current.rotate = false; setRotate(false); } };
    preference();
    media.addEventListener('change', preference);
    const init = async () => {
      const [T, { OrbitControls }, { RoomEnvironment }] = await Promise.all([
        import('three'), import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
      ]);
      if (stopped || !viewport.current) return;
      const host = viewport.current;
      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFShadowMap;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(33, 1, .1, 50);
      camera.position.set(2.8, 2.1, 9.7);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; controls.enablePan = false;
      controls.enableDamping = true; controls.dampingFactor = .07; controls.rotateSpeed = .5;
      controls.enableRotate = window.matchMedia('(pointer:fine)').matches;
      renderer.domElement.style.touchAction = 'pan-y';
      controls.update(); controls.saveState();
      const generator = new T.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = generator.fromScene(room, .04);
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.4;
      room.dispose(); generator.dispose();
      scene.add(new T.AmbientLight(0xffffff, .3));
      const key = new T.DirectionalLight(0xfff7e8, 4);
      key.position.set(-3, 5, 5); key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      Object.assign(key.shadow.camera, {left:-5,right:5,top:5,bottom:-5});
      key.shadow.bias = -.001; key.shadow.normalBias = .025;
      scene.add(key);
      const rim = new T.DirectionalLight(0xd6e2ff, 3);
      rim.position.set(4, 1, -3); scene.add(rim);
      const silver = new T.MeshStandardMaterial({ color:0xc3c8cd, metalness:1, roughness:.23 });
      const edge = new T.MeshStandardMaterial({ color:0xe4e4e1, metalness:.95, roughness:.16 });
      const graphite = new T.MeshStandardMaterial({ color:0x222427, metalness:.9, roughness:.28 });
      const orange = new T.MeshStandardMaterial({ color:0xe35022, metalness:.45, roughness:.28 });
      const assembly = new T.Group(); assembly.rotation.set(.18, -.22, -.24); scene.add(assembly);
      const parts: Group[] = [];
      const ring = (outer:number, inner:number, depth:number, holes:number, material:MeshStandardMaterial) => {
        const outline = new T.Shape(); outline.absarc(0,0,outer,0,Math.PI*2,false);
        const center = new T.Path(); center.absarc(0,0,inner,0,Math.PI*2,true); outline.holes.push(center);
        for(let i=0;i<holes;i++) {
          const a=i/holes*Math.PI*2, r=(outer+inner)/2, hole=new T.Path();
          hole.absarc(Math.cos(a)*r,Math.sin(a)*r,(outer-inner)*.18,0,Math.PI*2,true); outline.holes.push(hole);
        }
        const geometry = new T.ExtrudeGeometry(outline,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.027,bevelThickness:.023,curveSegments:72});
        geometry.translate(0,0,-depth/2);
        const mesh = new T.Mesh(geometry,material); mesh.castShadow=true; mesh.receiveShadow=true; return mesh;
      };
      [[2.18,1.92,.2],[1.75,1.47,.22],[1.27,.98,.24],[.77,.5,.22]].forEach(([outer,inner,depth],i) => {
        const group=new T.Group(); group.add(ring(outer,inner,depth,i===3?0:6,silver));
        const line = new T.Mesh(new T.TorusGeometry((outer+inner)/2,.012,6,128),i===2?orange:edge);
        line.position.z=depth/2+.031; group.add(line);
        for(let j=0;j<2;j++) {
          const pin=new T.Mesh(new T.CylinderGeometry(.075,.075,.36,20),graphite);
          pin.rotation.z=Math.PI/2; pin.position.x=(j===0?-1:1)*(outer+.03); group.add(pin);
        }
        parts.push(group); assembly.add(group);
      });
      const bearing=new T.Group(); bearing.add(ring(.48,.24,.28,0,graphite));
      for(let i=0;i<10;i++) {
        const a=i*Math.PI*2/10, ball=new T.Mesh(new T.SphereGeometry(.069,16,12),edge);
        ball.position.set(Math.cos(a)*.36,Math.sin(a)*.36,.165); bearing.add(ball);
      }
      parts.push(bearing); assembly.add(bearing);
      const floor = new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({ opacity:.14 }));
      floor.rotation.x=-Math.PI/2; floor.position.y=-2.55; floor.receiveShadow=true; scene.add(floor);
      let frame=0, visible=true, last=0, phase=0, spread=0;
      const resize = () => {
        const {width,height}=host.getBoundingClientRect(); if(!width || !height) return;
        renderer.setSize(width,height); camera.aspect=width/height; camera.updateProjectionMatrix();
      };
      const sizeObserver=new ResizeObserver(resize); sizeObserver.observe(host); resize();
      const hero=host.closest('section');
      const draw = (time:number) => {
        if(stopped || !visible || document.hidden) { frame=0; return; }
        const delta=Math.min((time-last)/1000,.04); last=time;
        if(settings.current.rotate && !media.matches) phase+=delta*.17;
        const bounds=hero?.getBoundingClientRect();
        const scroll=bounds && !media.matches ? Math.max(0,Math.min(1,-bounds.top/(bounds.height*.9))) : 0;
        const target=settings.current.exploded?1:scroll*.55;
        spread+=(target-spread)*(media.matches?1:.065);
        const angles=[.25,-.48,.55,-.2,0];
        parts.forEach((part,i)=>{
          part.rotation.y=angles[i]+(i%2===0?1:-1)*Math.sin(phase+i*.7)*.18;
          part.rotation.x=i<4?Math.sin(phase*.6+i)*.1:0;
          part.position.set((i-2)*spread*.3,(2-i)*spread*.2,(2-i)*spread*.6);
        });
        assembly.rotation.y=-.22+Math.sin(phase*.45)*.2;
        controls.update(); renderer.render(scene,camera); frame=requestAnimationFrame(draw);
      };
      const start=()=>{if(!frame && visible && !document.hidden) { last=performance.now(); frame=requestAnimationFrame(draw); }};
      const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();},{rootMargin:'100px'});
      intersection.observe(host);
      const visibility=()=>{if(!document.hidden)start();}; document.addEventListener('visibilitychange',visibility);
      const keyboard=(event:KeyboardEvent)=>{
        const step:Record<string,number[]>={ArrowLeft:[-.17,0],ArrowRight:[.17,0],ArrowUp:[0,.17],ArrowDown:[0,-.17]};
        if(!step[event.key])return; event.preventDefault();
        const spherical=new T.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
        spherical.theta+=step[event.key][0]; spherical.phi=T.MathUtils.clamp(spherical.phi+step[event.key][1],.2,Math.PI-.2);
        camera.position.copy(new T.Vector3().setFromSpherical(spherical).add(controls.target)); controls.update();
      };
      host.addEventListener('keydown',keyboard); resetView.current=()=>{controls.reset();phase=0;};
      const contextLost=(event:Event)=>{event.preventDefault();setReady(false);setFailed(true);};
      renderer.domElement.addEventListener('webglcontextlost',contextLost);
      dispose=()=>{
        cancelAnimationFrame(frame); intersection.disconnect(); sizeObserver.disconnect();
        document.removeEventListener('visibilitychange',visibility); host.removeEventListener('keydown',keyboard);
        renderer.domElement.removeEventListener('webglcontextlost',contextLost); controls.dispose();
        const geometries=new Set<BufferGeometry>(), materials=new Set<Material>();
        scene.traverse(object=>{if(object instanceof T.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
        geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose());
        environment.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
      start(); setReady(true);
    };
    init().catch(()=>{dispose();if(!stopped){setReady(false);setFailed(true);}});
    return()=>{stopped=true;dispose();media.removeEventListener('change',preference);};
  }, []);

  return <div className={'assembly '+(ready?'assembly-ready':'')}>
    <img className="assembly-fallback" src="/titanium-mechanism.png" width="1254" height="1254" alt="Conceptual titanium ring assembly" fetchPriority="high"/>
    <div ref={viewport} className="assembly-viewport" tabIndex={ready?0:-1} role="group" aria-label="Interactive ring form study. Use arrow keys to rotate, or drag with a mouse."/>
    <div className="assembly-label mono"><span className="crosshair">+</span> FORM STUDY / 001</div>
    {ready&&<><div className="assembly-hint"><Move size={13}/><span>Drag or use arrow keys to rotate</span></div><div className="assembly-controls">
      <button className={'explode-button '+(exploded?'is-exploded':'')} onClick={()=>setExploded(v=>!v)}><Expand size={15}/>{exploded?'Reassemble':'Explode view'}</button>
      <div className="auto-control"><Switch id="auto-rotate" checked={rotate} onCheckedChange={setRotate} size="sm"/><label htmlFor="auto-rotate">Auto-rotate</label></div>
      <button className="reset-view" aria-label="Reset assembly view" onClick={()=>{setExploded(false);resetView.current();}}><RotateCcw size={16}/></button>
    </div></>}
    <p className="assembly-caption">{failed?'Static visual study · 3D unavailable in this browser.':'Interactive visual study. Not a project model.'}</p>
  </div>;
}
