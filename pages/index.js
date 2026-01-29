'use client';
import React, { useState } from 'react';

// 定义商务主题色
const THEME_COLOR = '#003366'; 
const BG_COLOR = '#f4f7fa';    

export default function TradeCalculator() {
  const [lang, setLang] = useState('zh'); 
  const [inputs, setInputs] = useState({
    price: '', qty: '', shipping: '', dutyRate: 10, vatRate: 20,
  });

  const t = {
    zh: {
      title: '中乌贸易成本计算器 (商务版)',
      price: '单价 (USD)', qty: '数量', shipping: '总运费 (USD)',
      duty: '关税率 (%)', vat: '增值税率 (%)',
      prodTotal: '商品货值', grandTotal: 'DDP 到岸总成本',
      btnCopy: '复制报价单 (微信)', 
      shareTitle: '快速分享至：',
      quoteTitle: '--- 📋 贸易报价单 ---',
    },
    en: {
      title: 'Trade Cost Calculator (Business)',
      price: 'Unit Price (USD)', qty: 'Quantity', shipping: 'Total Shipping (USD)',
      duty: 'Duty Rate (%)', vat: 'VAT Rate (%)',
      prodTotal: 'Product Value', grandTotal: 'Total Landed Cost (DDP)',
      btnCopy: 'Copy Quote (WeChat)', 
      shareTitle: 'Quick Share via:',
      quoteTitle: '--- 📋 Trade Quotation ---',
    },
    ua: {
      title: 'Калькулятор вартості (Business)',
      price: 'Ціна за одиницю (USD)', qty: 'Кількість', shipping: 'Вартість доставки (USD)',
      duty: 'Ставка мита (%)', vat: 'Ставка ПДВ (%)',
      prodTotal: 'Вартість товару', grandTotal: 'Повна вартість (DDP)',
      btnCopy: 'Копіювати (WeChat)', 
      shareTitle: 'Швидко надіслати через:',
      quoteTitle: '--- 📋 Комерційна пропозиція ---',
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
    return `${current.quoteTitle}\n\n${current.prodTotal}: $${productTotal.toLocaleString()}\n${current.shipping}: $${shippingTotal.toLocaleString()}\n-----------------\n关税/ПДВ: $${dutyAmt.toFixed(2)} / $${vatAmt.toFixed(2)}\n\n✅ ${current.grandTotal}: $${grandTotal.toLocaleString()}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getQuoteText());
    alert(lang === 'zh' ? '已复制！' : 'Copied!');
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '10px auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: `6px solid ${THEME_COLOR}` }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        {['zh', 'en', 'ua'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `1px solid ${THEME_COLOR}`, backgroundColor: lang === l ? THEME_COLOR : 'white', color: lang === l ? 'white' : THEME_COLOR, fontWeight: 'bold' }}>{l.toUpperCase()}</button>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', color: THEME_COLOR, marginBottom: '20px' }}>{t[lang].title}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div><span style={{fontSize:'13px', color:'#666'}}>{t[lang].price}</span><input type="number" name="price" value={inputs.price} onChange={handleInputChange} style={inputStyle} /></div>
        <div><span style={{fontSize:'13px', color:'#666'}}>{t[lang].qty}</span><input type="number" name="qty" value={inputs.qty} onChange={handleInputChange} style={inputStyle} /></div>
        <div><span style={{fontSize:'13px', color:'#666'}}>{t[lang].shipping}</span><input type="number" name="shipping" value={inputs.shipping} onChange={handleInputChange} style={inputStyle} /></div>
        <div style={{display:'flex', gap:'10px'}}>
          <div style={{flex:1}}><span style={{fontSize:'13px', color:'#666'}}>{t[lang].duty}</span><input type="number" name="dutyRate" value={inputs.dutyRate} onChange={handleInputChange} style={inputStyle} /></div>
          <div style={{flex:1}}><span style={{fontSize:'13px', color:'#666'}}>{t[lang].vat}</span><input type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange} style={inputStyle} /></div>
        </div>
      </div>

      <div style={{ marginTop: '25px', padding: '20px', backgroundColor: BG_COLOR, borderRadius: '15px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{t[lang].prodTotal}: ${productTotal.toLocaleString()}</p>
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #ccc' }}>
          <p style={{ margin: '0', fontSize: '16px', color: THEME_COLOR, fontWeight: 'bold' }}>{t[lang].grandTotal}:</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '2.5em', color: THEME_COLOR, fontWeight: '800' }}>${grandTotal.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleCopy} style={mainBtnStyle}>📋 {t[lang].btnCopy}</button>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button onClick={() => handleShare('whatsapp')} style={shareBtnStyle('#25D366')}>WhatsApp</button>
        <button onClick={() => handleShare('telegram')} style={shareBtnStyle('#0088cc')}>Telegram</button>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '10px', color: '#bbb', marginTop: '20px' }}>Maksym Trade Tool v2.0 (Kyiv)</p>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', marginTop: '4px' };
const mainBtnStyle = { width: '100%', padding: '16px', marginTop: '20px', backgroundColor: THEME_COLOR, color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
const shareBtnStyle = (bg) => ({ flex: 1, padding: '12px', backgroundColor: bg, color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' });
