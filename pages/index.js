'use client';
import React, { useState } from 'react';

// 统一品牌标识
const BRAND_BLUE = '#0070f3'; 
const LIGHT_BG = '#f0f7ff';    

export default function TradeCalculator() {
  const [lang, setLang] = useState('zh'); 
  const [inputs, setInputs] = useState({
    price: '', qty: '', shipping: '', dutyRate: 10, vatRate: 20,
  });

  const t = {
    zh: {
      title: '中乌贸易成本计算器',
      price: '单价 (USD)', qty: '数量', shipping: '总运费 (USD)',
      duty: '关税 (%)', vat: '增值税 (%)',
      prodTotal: '商品货值', grandTotal: 'DDP 到岸总成本',
      btnCopy: '复制报价单 (微信)', 
      quoteTitle: '--- 📋 贸易报价单 ---',
      taxLabel: '关税 / 增值税',
      footerLine1: 'Maksym Trade Tool | 中乌欧跨境业务支撑系统 v2.6.0',
      footerLine2: '跨境贸易专家 Maksym (Kyiv) 数字化驱动',
    },
    en: {
      title: 'Trade Cost Calculator',
      price: 'Price (USD)', qty: 'Qty', shipping: 'Shipping (USD)',
      duty: 'Duty (%)', vat: 'VAT (%)',
      prodTotal: 'Product Value', grandTotal: 'Landed Cost (DDP)',
      btnCopy: 'Copy Quote (WeChat)', 
      quoteTitle: '--- 📋 Trade Quote ---',
      taxLabel: 'Duty / VAT',
      footerLine1: 'Maksym Trade Tool | Business Support System v2.6.0',
      footerLine2: 'Trade Expert Maksym (Kyiv) Digitally Driven',
    },
    ua: {
      title: 'Калькулятор вартості',
      price: 'Ціна (USD)', qty: 'К-сть', shipping: 'Доставка (USD)',
      duty: 'Мито (%)', vat: 'ПДВ (%)',
      prodTotal: 'Вартість товару', grandTotal: 'Вартість DDP',
      btnCopy: 'Копіювати (WeChat)', 
      quoteTitle: '--- 📋 Комерційна пропозиція ---',
      taxLabel: 'Мито / ПДВ',
      footerLine1: 'Maksym Trade Tool | Система підтримки бізнесу v2.6.0',
      footerLine2: 'Експерт з торгівлі Максим (Київ) Цифровий привід',
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const productTotal = (Number(inputs.price) * Number(inputs.qty)) || 0;
  const shippingTotal = parseFloat(inputs.shipping) || 0;
  const dutyAmt = (productTotal + shippingTotal) * (Number(inputs.dutyRate) / 100);
  const vatAmt = (productTotal + shippingTotal + dutyAmt) * (Number(inputs.vatRate) / 100);
  const grandTotal = productTotal + shippingTotal + dutyAmt + vatAmt;

  const getQuoteText = () => {
    const current = t[lang];
    return `${current.quoteTitle}\n\n${current.prodTotal}: $${productTotal.toLocaleString()}\n${current.shipping}: $${shippingTotal.toLocaleString()}\n-----------------\n${current.taxLabel}: $${dutyAmt.toFixed(2)} / $${vatAmt.toFixed(2)}\n\n✅ ${current.grandTotal}: $${grandTotal.toLocaleString()}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getQuoteText());
    alert(lang === 'zh' ? '已复制！' : (lang === 'ua' ? 'Скопійовано!' : 'Copied!'));
  };

  const handleShare = (app) => {
    const text = encodeURIComponent(getQuoteText());
    const urls = {
      whatsapp: `https://wa.me/?text=${text}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`
    };
    window.open(urls[app], '_blank');
  };

  return (
    <div style={{ padding: '10px 15px', fontFamily: '-apple-system, sans-serif', maxWidth: '420px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 语言切换 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '12px' }}>
        {['zh', 'en', 'ua'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${BRAND_BLUE}`, backgroundColor: lang === l ? BRAND_BLUE : 'white', color: lang === l ? 'white' : BRAND_BLUE, fontWeight: 'bold', fontSize: '13px' }}>{l.toUpperCase()}</button>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', color: BRAND_BLUE, margin: '0 0 15px 0', fontSize: '1.35em', fontWeight: '800' }}>{t[lang].title}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={inputRow}><span style={labelStyle}>{t[lang].price}</span><input type="number" name="price" value={inputs.price} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={inputRow}><span style={labelStyle}>{t[lang].qty}</span><input type="number" name="qty" value={inputs.qty} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={inputRow}><span style={labelStyle}>{t[lang].shipping}</span><input type="number" name="shipping" value={inputs.shipping} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={{display:'flex', gap:'10px'}}>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].duty}</span><input type="number" name="dutyRate" value={inputs.dutyRate} onChange={handleInputChange} style={inputStyle} /></div>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].vat}</span><input type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange} style={inputStyle} /></div>
        </div>
      </div>

      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: LIGHT_BG, borderRadius: '12px', borderLeft: `5px solid ${BRAND_BLUE}` }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{t[lang].prodTotal}: ${productTotal.toLocaleString()}</p>
        <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed #ccc' }}>
          <p style={{ margin: '0', fontSize: '14px', color: BRAND_BLUE, fontWeight: 'bold' }}>{t[lang].grandTotal}:</p>
          <p style={{ margin: '0', fontSize: '2.3em', color: BRAND_BLUE, fontWeight: '900', letterSpacing: '-1px' }}>${grandTotal.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleCopy} style={mainBtnStyle}>📋 {t[lang].btnCopy}</button>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button onClick={() => handleShare('whatsapp')} style={shareBtnStyle('#25D366')}>WhatsApp</button>
        <button onClick={() => handleShare('telegram')} style={shareBtnStyle('#0088cc')}>Telegram</button>
      </div>
      
      {/* 品牌标准脚注 */}
      <div style={{ marginTop: 'auto', paddingTop: '20px', textAlign: 'center', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: '#333', margin: '0', fontWeight: 'bold' }}>{t[lang].footerLine1}</p>
        <p style={{ fontSize: '10px', color: '#888', margin: '4px 0 0 0' }}>{t[lang].footerLine2}</p>
      </div>
    </div>
  );
}

const inputRow = { display: 'flex', flexDirection: 'column', gap: '2px' };
const labelStyle = { fontSize: '11px', color: '#555', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' };
const mainBtnStyle = { width: '100%', padding: '15px', marginTop: '15px', backgroundColor: BRAND_BLUE, color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,112,243,0.2)' };
const shareBtnStyle = (bg) => ({ flex: 1, padding: '12px', backgroundColor: bg, color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' });
