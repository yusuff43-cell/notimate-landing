const termsCopy={
  th:{back:"กลับหน้าหลัก",footer:"AI monitor สำหรับแชท LINE ของธุรกิจในประเทศไทย"},
  en:{back:"Back to home",footer:"AI monitoring for business LINE chats in Thailand."},
  ru:{back:"На главную",footer:"AI-монитор рабочих LINE-чатов для владельца бизнеса в Таиланде."}
};

function applyTermsLanguage(requested){
  const lang=termsCopy[requested]?requested:"th";
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-policy]").forEach((section)=>{section.hidden=section.dataset.policy!==lang});
  document.querySelectorAll("[data-copy]").forEach((element)=>{element.textContent=termsCopy[lang][element.dataset.copy]});
  document.querySelectorAll(".language-switch button").forEach((button)=>button.classList.toggle("active",button.dataset.lang===lang));
  localStorage.setItem("notimate-language",lang);
}

document.querySelectorAll(".language-switch button").forEach((button)=>button.addEventListener("click",()=>applyTermsLanguage(button.dataset.lang)));
const savedTermsLanguage=localStorage.getItem("notimate-language");
const termsBrowserLanguage=(navigator.language||"").toLowerCase();
applyTermsLanguage(savedTermsLanguage||(termsBrowserLanguage.startsWith("ru")?"ru":termsBrowserLanguage.startsWith("en")?"en":"th"));
