const loader=document.querySelector(".loader");addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),450));const header=document.querySelector("header"),menu=document.querySelector(".menu"),nav=document.querySelector("header nav");addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>40),{passive:true});menu.addEventListener("click",()=>{const open=menu.classList.toggle("open");menu.setAttribute("aria-expanded",open);document.body.style.overflow=open?"hidden":""});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");document.body.style.overflow=""}));const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=Math.min(i%4,3)*70+"ms";reveal.observe(el)});function animateCount(el){const target=+el.dataset.count,start=performance.now();function tick(now){const p=Math.min((now-start)/1200,1),ease=1-Math.pow(1-p,3);el.textContent=Math.floor(target*ease).toLocaleString("ja-JP");if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}const counts=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);counts.unobserve(e.target)}}),{threshold:.6});document.querySelectorAll("[data-count]").forEach(el=>counts.observe(el));const cursor=document.querySelector(".cursor");if(matchMedia("(pointer:fine)").matches){addEventListener("mousemove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));el.addEventListener("mouseleave",()=>cursor.classList.remove("hover"))})}document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}));const form=document.querySelector("#contactForm");if(form){const rules={type:v=>v?"":"種別を選択してください。",name:v=>v.trim().length>1?"":"お名前を2文字以上で入力してください。",phone:v=>/^[0-9+()\- ]{10,}$/.test(v)?"":"正しい電話番号を入力してください。",email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?"":"正しいメールアドレスを入力してください。",message:v=>v.trim().length>=10?"":"10文字以上で入力してください。"};function validate(el){const msg=rules[el.id](el.value),field=el.closest(".field"),small=el.parentElement.querySelector("small");field.classList.toggle("invalid",!!msg);small.textContent=msg;return!msg}Object.keys(rules).forEach(id=>{const el=document.querySelector("#"+id);el.addEventListener("blur",()=>validate(el));el.addEventListener("input",()=>{if(el.closest(".field").classList.contains("invalid"))validate(el)})});form.addEventListener("submit",e=>{e.preventDefault();const valid=Object.keys(rules).map(id=>validate(document.querySelector("#"+id))).every(Boolean),status=form.querySelector(".status");if(!document.querySelector("#privacy").checked){status.textContent="プライバシーポリシーへの同意が必要です。";return}if(!valid){status.textContent="入力内容をご確認ください。";return}status.textContent="入力内容を確認しました。※ポートフォリオのため送信されません。";form.querySelector("button").innerHTML="確認完了 <b>✓</b>"})}addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("open"))menu.click()});



/* Keep technical compound terms together on mobile. */
(() => {
  const terms = ["自動火災報知設備","ウレタン塗膜防水","アスファルト防水","空調設備工事","換気設備工事","排煙設備工事","リノベーション","アフターサポート","高気密・高断熱","スマートホーム","メンテナンス","受変電設備","非常用電源","水質・保守点検","給水ポンプ","排水ポンプ","給水方式","給水設備","排水設備","衛生設備","照明設備","動力設備","弱電設備","通信設備","電気設備","冷媒配管","ドレン配管","ダクト製作","ダクト取付","改修工事","更新工事","シート防水","漏水調査","部分補修","防水工事","工程内検査","施工記録","注文住宅","定期点検","予防保全","緊急対応","現地調査","会社概要","お問い合わせ"];
  const selector = 'p, li, dt, dd, h1, h2, h3, a, strong';
  const escape = value => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern = new RegExp('(' + terms.sort((a,b) => b.length-a.length).map(escape).join('|') + ')', 'g');
  function protectTerms() {
    document.querySelectorAll(selector).forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        pattern.lastIndex = 0;
        if (node.parentElement?.closest('.keep-word') || !pattern.test(node.data)) return;
        pattern.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let last = 0;
        node.data.replace(pattern, (match, _term, offset) => {
          fragment.append(node.data.slice(last, offset));
          const span = document.createElement('span');
          span.className = 'keep-word';
          span.textContent = match;
          fragment.append(span);
          last = offset + match.length;
          return match;
        });
        fragment.append(node.data.slice(last));
        node.replaceWith(fragment);
      });
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', protectTerms) : protectTerms();
})();
