'use client';
import { useEffect } from 'react';

export default function Motion() {
 useEffect(()=>{
  const root=document.documentElement, reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.visible='true';observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px 35px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
  if(!reduced.matches)root.dataset.motionReady='true';
  const words=Array.from(document.querySelectorAll<HTMLElement>('[data-ink-word]'));
  const statement=document.querySelector<HTMLElement>('[data-ink]');
  const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-dock [data-section]'));
  const sections=links.map(link=>document.getElementById(link.dataset.section!));
  const darks=Array.from(document.querySelectorAll<HTMLElement>('.dark-surface'));
  let frame=0;
  const update=()=>{
   const height=root.scrollHeight-window.innerHeight;
   root.style.setProperty('--read-progress',String(height>0?Math.max(0,Math.min(1,window.scrollY/height)):0));
   const hero=document.getElementById('main');
   if(hero&&!reduced.matches){const progress=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/hero.offsetHeight));root.style.setProperty('--hero-text-y',(-progress*65)+'px');}
   const dark=darks.some(section=>{const r=section.getBoundingClientRect();return r.top<70&&r.bottom>70;});
   root.toggleAttribute('data-header-dark',dark);
   let active=0;
   sections.forEach((section,i)=>{if(section&&section.getBoundingClientRect().top<window.innerHeight*.45)active=i;});
   links.forEach((link,i)=>{link.classList.toggle('is-current',i===active);if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
   if(statement&&!reduced.matches){const r=statement.getBoundingClientRect(), progress=Math.max(0,Math.min(1,(window.innerHeight*.83-r.top)/(r.height+window.innerHeight*.18)));words.forEach((word,i)=>word.style.setProperty('--ink',String(Math.max(0,Math.min(1,progress*words.length-i)))));}
   frame=0;
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const preference=()=>{if(reduced.matches){delete root.dataset.motionReady;root.style.setProperty('--hero-text-y','0px');}else root.dataset.motionReady='true';request();};
  update();window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});reduced.addEventListener('change',preference);
  return()=>{observer.disconnect();cancelAnimationFrame(frame);delete root.dataset.motionReady;root.removeAttribute('data-header-dark');window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',preference);};
 },[]);
 return null;
}

