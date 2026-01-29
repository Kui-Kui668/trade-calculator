'use client';
import React, { useState } from 'react';

const THEME_COLOR = '#0070f3'; // 回归经典蓝色
const BG_COLOR = '#f0f7ff';    

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
      dutyVatLabel: '关税 / 增值税',
    },
    en: {
      title: 'Trade Cost Calculator',
      price: 'Unit Price (USD)', qty: 'Quantity', shipping: 'Total Shipping (USD)',
      duty: 'Duty (%)', vat: 'VAT (%)',
      prodTotal: 'Product Value', grandTotal: 'Landed Cost (DDP)',
      btnCopy: 'Copy Quote (WeChat)', 
      quoteTitle: '--- 📋 Trade Quotation ---',
      dutyVatLabel: 'Duty / VAT',
    },
    ua: {
      title: 'Калькулятор вартості',
      price: 'Ціна за одиницю (USD)', qty: 'Кількість', shipping: 'Вартість доставки (USD)',
      duty: 'Мито (%)', vat: 'ПДВ (%)',
      prodTotal: 'Вартість товару', grandTotal: 'Повна вартість (DDP)',
      btnCopy: 'Копіювати (WeChat)', 
      quoteTitle: '--- 📋 Комерційна пропозиція ---',
      dutyVatLabel: 'Мито / ПДВ',
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
    return `${current.quoteTitle}\n\n${current.prodTotal}: $${productTotal.toLocaleString()}\n${current.shipping}: $${shippingTotal.toLocaleString()}\n-----------------\n${current.dutyVatLabel}: $${dutyAmt.toFixed(2)} / $${vatAmt.toFixed(2)}\n\n✅ ${current.grandTotal}: $${grandTotal.toLocaleString()}`;
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
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '420px', margin: '5px auto', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: `5px solid ${THEME_COLOR}` }}>
      {/* 语言切换 - 更紧凑 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '15px' }}>
        {['zh', 'en', 'ua'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${THEME_COLOR}`, backgroundColor: lang === l ? THEME_COLOR : 'white', color: lang === l ? 'white' : THEME_COLOR, fontWeight: 'bold', fontSize: '13px' }}>{l.toUpperCase()}</button>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', color: THEME_COLOR, margin: '0 0 15px 0', fontSize: '1.3em' }}>{t[lang].title}</h2>
      
      {/* 输入区域 - 间距收紧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={rowStyle}><span style={labelStyle}>{t[lang].price}</span><input type="number" name="price" value={inputs.price} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={rowStyle}><span style={labelStyle}>{t[lang].qty}</span><input type="number" name="qty" value={inputs.qty} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={rowStyle}><span style={labelStyle}>{t[lang].shipping}</span><input type="number" name="shipping" value={inputs.shipping} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={{display:'flex', gap:'10px'}}>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].duty}</span><input type="number" name="dutyRate" value={inputs.dutyRate} onChange={handleInputChange} style={inputStyle} /></div>
          <div style={{flex:1}}><span style={labelStyle}>{t[lang].vat}</span><input type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange} style={inputStyle} /></div>
        </div>
      </div>

      {/* 结果区域 - 视觉优化 */}
      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: BG_COLOR, borderRadius: '12px' }}>
        <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{t[lang].prodTotal}: ${productTotal.toLocaleString()}</p>
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #ccc' }}>
          <p style={{ margin: '0', fontSize: '14px', color: THEME_COLOR, fontWeight: 'bold' }}>{t[lang].grandTotal}:</p>
          <p style={{ margin: '2px 0 0 0', fontSize: '2.2em', color: THEME_COLOR, fontWeight: '800' }}>${grandTotal.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleCopy} style={mainBtnStyle}>📋 {t[lang].btnCopy}</button>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button onClick={() => handleShare('whatsapp')} style={shareBtnStyle('#25D366')}>WhatsApp</button>
        <button onClick={() => handleShare('telegram')} style={shareBtnStyle('#0088cc')}>Telegram</button>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '9px', color: '#ccc', marginTop: '15px' }}>Maksym Trade Tool (Kyiv)</p>
    </div>
  );
}

const rowStyle = { display: 'flex', flexDirection: 'column', gap: '2px' };
const labelStyle = { fontSize: '12px', color: '#666', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' };
const mainBtnStyle = { width: '100%', padding: '14px', marginTop: '15px', backgroundColor: THEME_COLOR, color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const shareBtnStyle = (bg) => ({ flex: 1, padding: '10px', backgroundColor: bg, color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' });
