
(function(){
  const newSrc="/legacy/assets/6ba1f4ae5860cd24.jpg";
  function replaceCreate(){
    const headers=document.querySelectorAll('header.nbhead');
    headers.forEach(h=>{
      if(h.innerHTML.toLowerCase().includes("let's create") || h.innerHTML.toLowerCase().includes("lets create")){
        const img=h.querySelector('img');
        if(img && img.src!==newSrc){
          img.src=newSrc;
          img.style.objectFit='cover';
          img.style.objectPosition='center';
          console.log('replaced create image');
        }
      }
    });
  }
  setTimeout(replaceCreate,500);
  window.addEventListener('hashchange', ()=>setTimeout(replaceCreate,600));
  setTimeout(replaceCreate,800);
  new MutationObserver(replaceCreate).observe(document.body,{childList:true, subtree:true});
})();
