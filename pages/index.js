'use client';
import React, { useState } from 'react';

// 核心品牌色：同步汇率版本的明亮蓝色
const BRAND_BLUE = '#0070f3'; 
const DEEP_NAVY = '#003366'; // 保留原微信复制按钮的深色
const LIGHT_BG = '#f5f8fa';    

export default function TradeCalculator() {
  const [lang, setLang] = useState('zh'); 
  const [inputs, setInputs] = useState({
    price: '', qty: '', shipping: '', dutyRate: 10, vatRate: 20,
  });

  const t = {
    zh: {
      title: '贸易成本计算器',
      price: '单价 (USD)', qty: '数量', shipping: '总运费 (USD)',
      duty: '关税 (%)', vat: '增值税 (%)',
      prodTotal: '商品货值', grandTotal: 'DDP 到岸总成本',
      btnCopy: '复制报价单 (微信)', 
      quoteTitle: '--- 📋 贸易报价单 ---',
      taxLabel: '关税 / 增值税',
      footerMain: 'Maksym 数字化贸易助手 | 中乌欧跨境业务支撑系统 v2.7',
      footerSub: '跨境贸易专家 Maksym (Kyiv) 数字化驱动'
    },
    en: {
      title: 'Trade Cost Calculator',
      price: 'Price (USD)', qty: 'Qty', shipping: 'Shipping (USD)',
      duty: 'Duty (%)', vat: 'VAT (%)',
      prodTotal: 'Product Value', grandTotal: 'Landed Cost (DDP)',
      btnCopy: 'Copy Quote (WeChat)', 
      quoteTitle: '--- 📋 Trade Quote ---',
      taxLabel: 'Duty / VAT',
      footerMain: 'Maksym Trade Suite | China-Ukraine-Europe Support v2.7',
      footerSub: 'Powered by Digital Trade Expert Maksym (Kyiv)'
    },
    ua: {
      title: 'Калькулятор вартості',
      price: 'Ціна (USD)', qty: 'К-сть', shipping: 'Доставка (USD)',
      duty: 'Мито (%)', vat: 'ПДВ (%)',
      prodTotal: 'Вартість товару', grandTotal: 'Вартість DDP',
      btnCopy: 'Копіювати (WeChat)', 
      quoteTitle: '--- 📋 Комерційна пропозиція ---',
      taxLabel: 'Мито / ПДВ',
      footerMain: 'Maksym Trade Assistant | Система підтримки бізнесу v2.7',
      footerSub: 'Цифрова платформа експерта Maksym (Kyiv)'
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
    <div style={{ padding: '10px', fontFamily: '-apple-system, sans-serif', maxWidth: '400px', margin: '0 auto', backgroundColor: '#fff' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
        {['zh', 'en', 'ua'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '6px', borderRadius: '6px', border: `1px solid ${BRAND_BLUE}`, backgroundColor: lang === l ? BRAND_BLUE : 'white', color: lang === l ? 'white' : BRAND_BLUE, fontWeight: 'bold', fontSize: '12px' }}>{l.toUpperCase()}</button>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', color: BRAND_BLUE, margin: '10px 0 15px 0', fontSize: '1.3em', fontWeight: '800' }}>{t[lang].title}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={inputRow}><span style={labelStyle}>{t[lang].price}</span><input type="number" name="price" value={inputs.price} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={inputRow}><span style={labelStyle}>{t[lang].qty}</span><input type="number" name="qty" value={inputs.qty} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={inputRow}><span style={labelStyle}>{t[lang].shipping}</span><input type="number" name="shipping" value={inputs.shipping} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={{display:'flex', gap:'8px'}}>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].duty}</span><input type="number" name="dutyRate" value={inputs.dutyRate} onChange={handleInputChange} style={inputStyle} /></div>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].vat}</span><input type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange} style={inputStyle} /></div>
        </div>
      </div>

      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: LIGHT_BG, borderRadius: '10px', borderLeft: `5px solid ${BRAND_BLUE}` }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{t[lang].prodTotal}: ${productTotal.toLocaleString()}</p>
        <div style={{ marginTop: '5px', paddingTop: '5px', borderTop: '1px dashed #ccc' }}>
          <p style={{ margin: '0', fontSize: '14px', color: BRAND_BLUE, fontWeight: 'bold' }}>{t[lang].grandTotal}:</p>
          <p style={{ margin: '0', fontSize: '2.4em', color: BRAND_BLUE, fontWeight: '900', letterSpacing: '-1px' }}>${grandTotal.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleCopy} style={mainBtnStyle}>📋 {t[lang].btnCopy}</button>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button onClick={() => handleShare('whatsapp')} style={shareBtnStyle('#25D366')}>WhatsApp</button>
        <button onClick={() => handleShare('telegram')} style={shareBtnStyle('#0088cc')}>Telegram</button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px 0', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: '#888', margin: '0', fontWeight: '500' }}>{t[lang].footerMain}</p>
        <p style={{ fontSize: '9px', color: '#aaa', margin: '3px 0 0 0' }}>{t[lang].footerSub}</p>
      </div>
    </div>
  );
}

const inputRow = { display: 'flex', flexDirection: 'column', gap: '2px' };
const labelStyle = { fontSize: '12px', color: '#666', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' };
const mainBtnStyle = { width: '100%', padding: '14px', marginTop: '15px', backgroundColor: DEEP_NAVY, color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const shareBtnStyle = (bg) => ({ flex: 1, padding: '10px', backgroundColor: bg, color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' });
