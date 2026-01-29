import React, { useState } from 'react';

export default function TradeCalculator() {
  // 1. 这里是我们的“账本”数据
  const [inputs, setInputs] = useState({
    price: '',
    qty: '',
    shipping: '',
    dutyRate: 10, // 默认关税 10%
    vatRate: 20,  // 默认增值税 20%
  });

  // 2. 这里是“大脑”：计算逻辑
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const productTotal = (inputs.price * inputs.qty) || 0;
  const shippingTotal = parseFloat(inputs.shipping) || 0;
  const dutyAmount = (productTotal + shippingTotal) * (inputs.dutyRate / 100);
  const vatAmount = (productTotal + shippingTotal + dutyAmount) * (inputs.vatRate / 100);
  const grandTotal = productTotal + shippingTotal + dutyAmount + vatAmount;

  // 3. 这里是“功能”：生成报价单
  const copyQuote = () => {
    const quote = `--- 贸易报价单 ---\n商品货值: $${productTotal.toFixed(2)}\n运费: $${shippingTotal.toFixed(2)}\n关税: $${dutyAmount.toFixed(2)}\n增值税: $${vatAmount.toFixed(2)}\n-----------------\n到岸总成本: $${grandTotal.toFixed(2)}`;
    alert(quote); // 在手机上会弹出一个整齐的报价框
  };

  // 4. 这里是“脸面”：手机端界面
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>中乌贸易成本计算</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>单价 (USD): <input type="number" name="price" value={inputs.price} onChange={handleInputChange} style={inputStyle} /></label>
        <label>数量: <input type="number" name="qty" value={inputs.qty} onChange={handleInputChange} style={inputStyle} /></label>
        <label>运费 (USD): <input type="number" name="shipping" value={inputs.shipping} onChange={handleInputChange} style={inputStyle} /></label>
        <label>关税率 (%): <input type="number" name="dutyRate" value={inputs.dutyRate} onChange={handleInputChange} style={inputStyle} /></label>
        <label>增值税率 (%): <input type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange} style={inputStyle} /></label>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <p><strong>商品总值:</strong> ${productTotal.toFixed(2)}</p>
        <p><strong>到岸总成本:</strong> <span style={{ color: '#d32f2f', fontSize: '1.2em' }}>${grandTotal.toFixed(2)}</span></p>
      </div>

      <button onClick={copyQuote} style={buttonStyle}>生成简易报价单</button>
    </div>
  );
}

// 简单的样式
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' };
const buttonStyle = { width: '100%', padding: '15px', marginTop: '20px', backgroundColor: '#0070f3', color: '#white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
