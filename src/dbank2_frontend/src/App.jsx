import { useState, useEffect } from 'react';
import { dbank2_backend } from 'declarations/dbank2_backend';

function App() {
  const [balance, setBalance] = useState('');
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch balance on mount
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const result = await dbank2_backend.checkBalance();
      setBalance((Math.round(result * 100) / 100).toString());
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const deposit = parseFloat(inputAmount);
      const withdrawal  = parseFloat(outputAmount);

      if (inputAmount.length !== 0 && !isNaN(deposit)) {
        await dbank2_backend.topUp(deposit);
      }

      if (outputAmount.length !== 0 && !isNaN(withdrawal )) {
        await dbank2_backend.topDown(withdrawal );
      }

      // await dbank2_backend.compound();
      await fetchBalance();

      setInputAmount("");
      setOutputAmount("");
    } catch (err) {
      console.error("Transaction failed:", err);
    }

    setIsSubmitting(false);
  };

  return (
    <main>
      <div className="container">
        <img src="/token_logo.png" alt="Token logo" width="100" />
        <h1>Current Balance: $<span id="value">{balance}</span></h1>

        <div className="divider"></div>

        <form onSubmit={handleSubmit}>
          <h2>Amount to Top Up</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min="0"
            name="topUp"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
          <h2>Amount to Withdraw</h2>
          <input
            id="input-amount"
            type="number"
            name="topDown"
            step="0.01"
            min="0"
            value={outputAmount}
            onChange={(e) => setOutputAmount(e.target.value)}
          />
          <input
            id="submit-btn"
            type="submit"
            value={isSubmitting ? "Processing..." : "Finalise Transaction"}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </main>
  );
}

export default App;
