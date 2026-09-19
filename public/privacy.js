const privacyCopy={
  th:{back:"กลับหน้าหลัก",footer:"AI monitor สำหรับแชท LINE ของธุรกิจในประเทศไทย"},
  en:{back:"Back to home",footer:"AI monitoring for business LINE chats in Thailand."},
  ru:{back:"На главную",footer:"AI-монитор рабочих LINE-чатов для владельца бизнеса в Таиланде."}
};

function applyPrivacyLanguage(requested){
  const lang=privacyCopy[requested]?requested:"th";
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-policy]").forEach((section)=>{section.hidden=section.dataset.policy!==lang});
  document.querySelectorAll("[data-copy]").forEach((element)=>{element.textContent=privacyCopy[lang][element.dataset.copy]});
  document.querySelectorAll(".language-switch button").forEach((button)=>button.classList.toggle("active",button.dataset.lang===lang));
  localStorage.setItem("notimate-language",lang);
}

document.querySelectorAll(".language-switch button").forEach((button)=>button.addEventListener("click",()=>applyPrivacyLanguage(button.dataset.lang)));
const saved=localStorage.getItem("notimate-language");
const browser=(navigator.language||"").toLowerCase();
applyPrivacyLanguage(saved||(browser.startsWith("ru")?"ru":browser.startsWith("en")?"en":"th"));
