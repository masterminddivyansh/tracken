import { useMemo, useState } from "react";
import { ArrowRight, Bell, CalendarDays, CircleDollarSign, PieChart, Plus, Receipt, Sparkles, Trash2, TrendingDown, TrendingUp, WalletCards, Target, ShieldCheck, AlertTriangle } from "lucide-react";

const DEFAULT_CATEGORIES = ["Housing","Grocery","Transport","Bills","Electricity Bill","Insurance","Shopping","Education","Health","Entertainment","Subscriptions","EMI","Other"];
const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
const moneyDateKey = (item) => String(item?.date || item?.created_at || "").slice(0,10);
const monthLabel = (key) => { const [y,m] = key.split("-").map(Number); return new Date(y,m-1,1).toLocaleDateString("en-US",{month:"long",year:"numeric"}); };
const daysInMonth = (key) => { const [y,m] = key.split("-").map(Number); return new Date(y,m,0).getDate(); };
const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
const fmt = (n) => `₹${Math.round(Number(n)||0).toLocaleString("en-IN")}`;

export default function FinanceEngine({
  tab, money, setMoney, budget, setBudget, budgetOverride, setBudgetOverride, budgetCategories, setBudgetCategories,
  cashflowAutomationRules, cashflowFrequencyLabel, createCashflowAutomation, toggleCashflowAutomation, deleteCashflowAutomation,
  cashflowAutomationTitle, setCashflowAutomationTitle, cashflowAutomationType, setCashflowAutomationType,
  cashflowAutomationAmount, setCashflowAutomationAmount, cashflowAutomationCategory, setCashflowAutomationCategory,
  cashflowAutomationFrequency, setCashflowAutomationFrequency, cashflowAutomationStartDate, setCashflowAutomationStartDate,
  cashflowAutomationEndDate, setCashflowAutomationEndDate, goals, setGoals, financeGoalPlans, setFinanceGoalPlans, financeGoals, setFinanceGoals,
  onGoalContribution, createFinanceGoal
}) {
  const safeMoney = Array.isArray(money) ? money : [];
  const safeBudgetCategories = budgetCategories && typeof budgetCategories === "object" && !Array.isArray(budgetCategories) ? budgetCategories : {};
  const safeFinanceGoals = Array.isArray(financeGoals) ? financeGoals : [];
  const safeCashflowAutomationRules = Array.isArray(cashflowAutomationRules) ? cashflowAutomationRules : [];
  const [selectedMonth, setSelectedMonth] = useState(monthKey(new Date()));
  const [entry, setEntry] = useState({type:"expense",title:"Transaction",amount:"",category:"Grocery",date:new Date().toISOString().slice(0,10)});
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState({type:"expense",title:"",amount:"",category:"Other",date:""});
  const [budgetDraft, setBudgetDraft] = useState("");
  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [contributionNote, setContributionNote] = useState("");
  const [contributing, setContributing] = useState(false);
  const [goalMessage, setGoalMessage] = useState("");
  const [financeGoalForm, setFinanceGoalForm] = useState({title:"",target:"",saved:"",monthly:"",deadline:""});
  const [editingFinanceGoalId, setEditingFinanceGoalId] = useState(null);

  const allCategories = useMemo(() => [...new Set([...DEFAULT_CATEGORIES,...safeMoney.map(x=>x.category).filter(Boolean),...Object.keys(safeBudgetCategories)])], [safeMoney,safeBudgetCategories]);
  const budgetTableCategories = useMemo(() => [...new Set([...DEFAULT_CATEGORIES,...Object.keys(safeBudgetCategories),...safeMoney.map(x=>x.category).filter(Boolean)] )].filter(c=>c!=="Food"), [safeMoney,safeBudgetCategories]);
  const monthMoney = useMemo(() => safeMoney.filter(x => moneyDateKey(x).startsWith(selectedMonth)), [safeMoney,selectedMonth]);
  const categorySpend = useMemo(() => {
    const map={};
    monthMoney.filter(x=>x.type==="expense").forEach(x=>{const c=x.category||"Other";map[c]=(map[c]||0)+Number(x.amount||0);});
    return Object.entries(map).sort((a,b)=>b[1]-a[1]);
  },[monthMoney]);
  const budgetValueFor = (category) => category === "Grocery" ? Number(safeBudgetCategories?.Grocery || safeBudgetCategories?.Food || 0) : Number(safeBudgetCategories?.[category] || 0);
  const budgetSpentFor = (category) => category === "Grocery" ? categorySpend.filter(([c])=>c==="Grocery"||c==="Food").reduce((s,[,v])=>s+v,0) : (categorySpend.find(([c])=>c===category)?.[1]||0);
  const categoryBudgetTotal = useMemo(() => budgetTableCategories.reduce((sum,cat)=>sum+budgetValueFor(cat),0), [budgetTableCategories,budgetCategories]);
  const income = monthMoney.filter(x=>x.type==="income").reduce((s,x)=>s+Number(x.amount||0),0);
  const expense = monthMoney.filter(x=>x.type==="expense").reduce((s,x)=>s+Number(x.amount||0),0);
  const savings = monthMoney.filter(x=>x.type==="saving").reduce((s,x)=>s+Number(x.amount||0),0);
  const net = income-expense-savings;
  const savingsRate = income>0 ? Math.round((savings/income)*100) : 0;
  const monthDays = daysInMonth(selectedMonth);
  const today = new Date();
  const currentMonth = monthKey(today);
  const dayOfMonth = selectedMonth===currentMonth ? today.getDate() : monthDays;
  const remainingDays = Math.max(1,monthDays-dayOfMonth+1);
  const dailyExpense = dayOfMonth>0 ? expense/dayOfMonth : 0;
  const projectedExpense = selectedMonth===currentMonth ? dailyExpense*monthDays : expense;
  const monthlyBudget = Math.max(0,Number(budgetOverride ? (budget||0) : (categoryBudgetTotal || budget || 0)));
  const remainingBudget = Math.max(0,monthlyBudget-expense);
  const previousMonth = useMemo(() => { const [y,m]=selectedMonth.split("-").map(Number); return monthKey(new Date(y,m-2,1)); },[selectedMonth]);
  const previousMonthExpense = useMemo(() => safeMoney.filter(x=>moneyDateKey(x).startsWith(previousMonth)&&x.type==="expense").reduce((s,x)=>s+Number(x.amount||0),0),[safeMoney,previousMonth]);
  const spendingChange = previousMonthExpense>0 ? Math.round((expense-previousMonthExpense)/previousMonthExpense*100) : 0;

  const incomeSources = useMemo(() => {
    const map={};
    monthMoney.filter(x=>x.type==="income").forEach(x=>{const c=x.category||"Other";map[c]=(map[c]||0)+Number(x.amount||0);});
    return Object.entries(map).sort((a,b)=>b[1]-a[1]);
  },[monthMoney]);
  const filteredMoney = useMemo(() => monthMoney.filter(x=>(filterType==="all"||x.type===filterType)&&(filterCategory==="all"||(x.category||"Other")===filterCategory)),[monthMoney,filterType,filterCategory]);

  const upcomingRecurring = useMemo(() => {
    if(selectedMonth!==currentMonth) return 0;
    const start=today.toISOString().slice(0,10);
    const end=new Date(today.getFullYear(),today.getMonth()+1,0).toISOString().slice(0,10);
    let total=0;
    for(const rule of safeCashflowAutomationRules){
      if(!rule.enabled||rule.type!=="expense"||!rule.startDate)continue;
      let d=rule.startDate,guard=0;
      while(d<=end&&guard++<400){
        if(d>=start&&d.startsWith(selectedMonth)&&(!rule.endDate||d<=rule.endDate))total+=Number(rule.amount||0);
        const next=new Date(`${d}T12:00:00`);
        if(rule.frequency==="daily")next.setDate(next.getDate()+1);
        else if(rule.frequency==="weekdays"){do{next.setDate(next.getDate()+1)}while(next.getDay()===0||next.getDay()===6);}
        else if(rule.frequency==="weekly")next.setDate(next.getDate()+7);
        else{const day=next.getDate();next.setDate(1);next.setMonth(next.getMonth()+1);next.setDate(Math.min(day,new Date(next.getFullYear(),next.getMonth()+1,0).getDate()));}
        d=next.toISOString().slice(0,10);
      }
    }
    return total;
  },[cashflowAutomationRules,selectedMonth,currentMonth]);

  const safeToSpend = monthlyBudget>0 ? Math.max(0,(remainingBudget-upcomingRecurring)/remainingDays) : Math.max(0,(net-upcomingRecurring)/remainingDays);
  const budgetAlerts = useMemo(()=>{
    const alerts=[];
    if(monthlyBudget>0){const pct=expense/monthlyBudget*100;if(pct>=100)alerts.push({tone:"danger",text:`Monthly spending is ${fmt(expense-monthlyBudget)} over budget.`});else if(pct>=80)alerts.push({tone:"warn",text:`${Math.round(pct)}% of your monthly budget is already used.`});}
    if(previousMonthExpense>0&&spendingChange>=25)alerts.push({tone:"warn",text:`Spending is ${spendingChange}% higher than last month.`});
    for(const [cat,limitRaw] of Object.entries(safeBudgetCategories)){const limit=Number(limitRaw)||0;const spent=categorySpend.find(([c])=>c===cat)?.[1]||0;if(limit&&spent>limit)alerts.push({tone:"danger",text:`${cat} is ${fmt(spent-limit)} over its budget.`});else if(limit&&spent/limit>=.8)alerts.push({tone:"warn",text:`${cat} budget is ${Math.round(spent/limit*100)}% used.`});}
    return alerts.slice(0,5);
  },[monthlyBudget,budgetCategories,expense,categorySpend,previousMonthExpense,spendingChange]);
  const health = monthlyBudget>0 ? clamp(Math.round(100-(expense/monthlyBudget*100-60)*1.25),0,100) : clamp(Math.round(55+savingsRate),0,100);
  const financeGoalList = safeFinanceGoals;
  const activeGoals = useMemo(()=> financeGoalList.filter(g=>g.status!=="completed"&&Number(g.target)>0),[financeGoalList]);
  const selectedGoal = activeGoals.find(g=>String(g.id)===String(selectedGoalId)) || activeGoals[0];
  const goalRemaining = selectedGoal ? Math.max(0,Number(selectedGoal.target||0)-Number(selectedGoal.saved||0)) : 0;
  const plannedMonthly = selectedGoal ? Number(selectedGoal.monthly||0) : 0;
  const goalMonths = plannedMonthly>0 ? Math.ceil(goalRemaining/plannedMonthly) : null;
  const totalGoalFundedThisMonth = selectedGoal ? monthMoney.filter(x=>x.type==="saving"&&String(x.financeGoalId||"")===String(selectedGoal.id)).reduce((s,x)=>s+Number(x.amount||0),0) : 0;

  const addMoney = () => {
    if(!entry.title.trim()||Number(entry.amount)<=0||!entry.date)return;
    setMoney(m=>[{...entry,id:crypto.randomUUID(),amount:Number(entry.amount),date:new Date(`${entry.date}T12:00:00`).toISOString()},...m]);
    setEntry(e=>({...e,title:"Transaction",amount:""}));
  };
  const startEdit=x=>{setEditingId(x.id);setEdit({type:x.type==="saving"?"expense":x.type,title:x.title||"",amount:x.amount||"",category:x.category||"Other",date:moneyDateKey(x)});};
  const saveEdit=()=>{if(!editingId||!edit.title.trim()||Number(edit.amount)<=0)return;setMoney(m=>m.map(x=>x.id===editingId?{...x,...edit,amount:Number(edit.amount),date:new Date(`${edit.date}T12:00:00`).toISOString()}:x));setEditingId(null);};
  const deleteMoney=id=>{if(window.confirm("Delete this cashflow entry? This cannot be undone."))setMoney(m=>m.filter(x=>x.id!==id));};
  const addBudgetCategory=()=>{const name=newBudgetCategory.trim();const amount=Number(newBudgetAmount);if(!name||amount<=0)return;setBudgetCategories(c=>({...c,[name]:amount}));setNewBudgetCategory("");setNewBudgetAmount("");};
  const setCategoryAmount=(name,value)=>setBudgetCategories(c=>({...c,[name]:Math.max(0,Number(value)||0)}));
  const removeBudgetCategory=name=>setBudgetCategories(c=>{const n={...c};delete n[name];return n;});
  const savePlan=(goalId,value)=>setFinanceGoals?.(p=>(p||[]).map(g=>String(g.id)===String(goalId)?{...g,monthly:Math.max(0,Number(value)||0),updatedAt:new Date().toISOString()}:g));
  const cancelFinanceGoalEdit=()=>{setFinanceGoalForm({title:"",target:"",saved:"",monthly:"",deadline:""});setEditingFinanceGoalId(null);};
  const contributeToGoal=async()=>{
    if(!selectedGoal)return;
    const amount=Number(contributionAmount);
    setGoalMessage("");
    if(!amount||amount<=0){setGoalMessage("Enter a contribution amount.");return;}
    if(amount>goalRemaining){setGoalMessage(`Maximum contribution is ${fmt(goalRemaining)} for this goal.`);return;}
    if(amount>Math.max(0,net)){setGoalMessage(`This month has only ${fmt(Math.max(0,net))} of available cashflow after recorded spending and savings.`);return;}
    setContributing(true);
    const result=await onGoalContribution?.(selectedGoal.id,amount,contributionNote);
    setContributing(false);
    if(result?.ok){setContributionAmount("");setContributionNote("");setGoalMessage(`Added ${fmt(amount)} to ${selectedGoal.title}. Goal progress and Cashflow were updated.`);}else setGoalMessage(result?.message||"Could not add the contribution.");
  };

  const moneyForm=<div className="finance-entry-form"><select value={entry.type} onChange={e=>setEntry({...entry,type:e.target.value})}><option value="expense">Expense</option><option value="income">Income</option></select><input value={entry.title} onChange={e=>setEntry({...entry,title:e.target.value})} placeholder="Description"/><input type="number" min="0" value={entry.amount} onChange={e=>setEntry({...entry,amount:e.target.value})} placeholder="Amount"/><select value={entry.category} onChange={e=>setEntry({...entry,category:e.target.value})}>{allCategories.map(c=><option key={c}>{c}</option>)}</select><input type="date" value={entry.date} onChange={e=>setEntry({...entry,date:e.target.value})}/><button className="primary-small" onClick={addMoney}><Plus size={15}/> Add</button></div>;

  const securityMessage = <div className="money-security-banner"><ShieldCheck size={16}/><div><strong>Your money stays private.</strong><span>Your money entries are private to your TRACKEN account and are not publicly visible. Keep your financial tracking inside your own workspace.</span></div></div>;

  const compactEntry = <div className="money-entry-minimal">
    <div className="money-entry-type"><button className={entry.type==="expense"?"active":""} onClick={()=>setEntry({...entry,type:"expense"})}>Expense</button><button className={entry.type==="income"?"active":""} onClick={()=>setEntry({...entry,type:"income"})}>Income</button></div>
    <input value={entry.title} onChange={e=>setEntry({...entry,title:e.target.value})} placeholder="What was it for?" />
    <input type="number" min="0" value={entry.amount} onChange={e=>setEntry({...entry,amount:e.target.value})} placeholder="Amount" />
    <input value={entry.category} onChange={e=>setEntry({...entry,category:e.target.value})} placeholder="Category · e.g. House Rent" />
    <button className="primary-small" onClick={addMoney}><Plus size={15}/> Add entry</button>
  </div>;

  const transactionRows = <div className="money-transactions-flat">
    <div className="money-list-head"><span>RECENT ENTRIES</span><div className="finance-filter-row"><select value={filterType} onChange={e=>setFilterType(e.target.value)}><option value="all">All</option><option value="income">Income</option><option value="expense">Expenses</option><option value="saving">Savings</option></select><select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}><option value="all">All categories</option>{allCategories.map(c=><option key={c}>{c}</option>)}</select></div></div>
    {filteredMoney.slice(0,50).map(x=>editingId===x.id
      ? <div className="money-row editing" key={x.id}><select value={edit.type} onChange={e=>setEdit({...edit,type:e.target.value})}><option value="expense">Expense</option><option value="income">Income</option></select><input value={edit.title} onChange={e=>setEdit({...edit,title:e.target.value})}/><input type="number" value={edit.amount} onChange={e=>setEdit({...edit,amount:e.target.value})}/><input value={edit.category} onChange={e=>setEdit({...edit,category:e.target.value})}/><input type="date" value={edit.date} onChange={e=>setEdit({...edit,date:e.target.value})}/><button className="primary-small" onClick={saveEdit}>Save</button><button className="ghost-small" onClick={()=>setEditingId(null)}>Cancel</button></div>
      : <div className="money-row" key={x.id}><span className={`money-type-dot ${x.type}`}></span><div className="money-row-main"><strong>{x.title}</strong><small>{x.category||"Other"} · {moneyDateKey(x)}</small></div><b className={x.type}>{x.type==="income"?"+":x.type==="saving"?"↗":"−"}{fmt(x.amount)}</b><div className="money-row-actions"><button onClick={()=>startEdit(x)} aria-label="Edit entry"><span>✎</span></button><button onClick={()=>deleteMoney(x.id)} aria-label="Delete entry"><Trash2 size={14}/></button></div></div>)}
    {!filteredMoney.length&&<div className="money-empty-flat"><Receipt size={20}/><span>No entries yet. Add your first income or expense above.</span></div>}
  </div>;

  if(tab==="money") return <section className="tracker-money finance-engine finance-v3">
    <FinanceHeader selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} label="MONEY" title="Cashflow" copy="Record money first. Understand it after." />
    {securityMessage}
    <section className="money-entry-section"><div className="money-section-head"><div><span className="card-kicker">NEW ENTRY</span><h2>Add money movement</h2></div><span className="money-date-label">{monthLabel(selectedMonth)}</span></div>{compactEntry}</section>
    <div className="money-summary-line"><span>Income <b>{fmt(income)}</b></span><span>Spent <b>{fmt(expense)}</b></span><span>Saved <b>{fmt(savings)}</b></span><span>Available <b className={net>=0?"positive":"negative"}>{fmt(net)}</b></span></div>
    {transactionRows}
    <details className="money-advanced"><summary>Recurring cashflow <span>{safeCashflowAutomationRules.length ? `${safeCashflowAutomationRules.length} rules` : "Optional"}</span></summary><CashflowAutomationCard {...{cashflowAutomationRules,cashflowFrequencyLabel,createCashflowAutomation,toggleCashflowAutomation,deleteCashflowAutomation,cashflowAutomationTitle,setCashflowAutomationTitle,cashflowAutomationType,setCashflowAutomationType,cashflowAutomationAmount,setCashflowAutomationAmount,cashflowAutomationCategory,setCashflowAutomationCategory,cashflowAutomationFrequency,setCashflowAutomationFrequency,cashflowAutomationStartDate,setCashflowAutomationStartDate,cashflowAutomationEndDate,setCashflowAutomationEndDate}}/></details>
    <details className="money-advanced"><summary>Money goals <span>{activeGoals.length ? `${activeGoals.length} active` : "Optional"}</span></summary><GoalFundingCard {...{activeGoals,selectedGoal,selectedGoalId,setSelectedGoalId,goalRemaining,plannedMonthly,goalMonths,totalGoalFundedThisMonth,contributionAmount,setContributionAmount,contributionNote,setContributionNote,contributing,contributeToGoal,goalMessage,setFinanceGoalPlans,savePlan,financeGoalForm,setFinanceGoalForm,createFinanceGoal,editingFinanceGoalId,cancelFinanceGoalEdit,setEditingFinanceGoalId}} /></details>
  </section>;

  const budgetRows = Object.entries(safeBudgetCategories).filter(([name])=>name.trim()).map(([name,limit])=>{
    const spent=budgetSpentFor(name); const pct=Number(limit)>0 ? spent/Number(limit)*100 : 0;
    return {name,limit:Number(limit)||0,spent,pct,remaining:Math.max(0,(Number(limit)||0)-spent)};
  });
  const manualBudgetTotal = budgetRows.reduce((sum,row)=>sum+row.limit,0);
  const activeBudget = manualBudgetTotal || Number(budget||0);

  return <section className="tracker-money finance-engine finance-v3">
    <FinanceHeader selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} label="MONEY" title="Budget" copy="Write the category yourself. Set the limit. TRACKEN shows the rest." />
    {securityMessage}
    <div className="budget-v3-total"><div><span>MONTHLY BUDGET</span><strong>{fmt(activeBudget)}</strong></div><label>Optional overall budget<input type="number" min="0" value={budgetDraft!==""?budgetDraft:(budgetOverride?budget:"")} onChange={e=>setBudgetDraft(e.target.value)} onBlur={()=>{if(budgetDraft!==""){setBudget(Number(budgetDraft)||0);setBudgetOverride(true);setBudgetDraft("")}}} placeholder="Uses category total" /></label>{budgetOverride&&<button className="ghost-small" onClick={()=>{setBudgetOverride(false);setBudgetDraft("")}}>Use category total</button>}</div>
    <section className="budget-v3-entry"><div className="money-section-head"><div><span className="card-kicker">NEW CATEGORY</span><h2>Set a budget</h2></div></div><div className="budget-add-minimal"><input value={newBudgetCategory} onChange={e=>setNewBudgetCategory(e.target.value)} placeholder="Category · e.g. House Rent"/><input type="number" min="0" value={newBudgetAmount} onChange={e=>setNewBudgetAmount(e.target.value)} placeholder="Budget amount"/><button className="primary-small" onClick={addBudgetCategory}><Plus size={15}/> Add category</button></div></section>
    <section className="budget-v3-list"><div className="budget-v3-head"><span>CATEGORY</span><span>BUDGET</span><span>SPENT</span><span>REMAINING</span></div>{budgetRows.map(row=><div className="budget-v3-row" key={row.name}><div><strong>{row.name}</strong><button onClick={()=>removeBudgetCategory(row.name)} aria-label={`Remove ${row.name}`}><Trash2 size={13}/></button></div><b>{fmt(row.limit)}</b><span>{fmt(row.spent)}</span><div className={row.remaining<0?"negative":""}><strong>{fmt(row.remaining)}</strong><div className="budget-v3-bar"><i style={{width:`${clamp(row.pct,0,100)}%`}}/></div><small>{Math.round(row.pct)}% used</small></div></div>)}{!budgetRows.length&&<div className="budget-v3-empty">Start with one category — <b>House Rent</b>, Grocery, Transport, or anything you track.</div>}</section>
    <div className="budget-v3-footer"><span>Total category budget <b>{fmt(manualBudgetTotal)}</b></span><span>Total spent <b>{fmt(expense)}</b></span><span>Remaining <b className={Math.max(0,activeBudget-expense)>0?"positive":"negative"}>{fmt(Math.max(0,activeBudget-expense))}</b></span></div>
  </section>;
}

function FinanceHeader({selectedMonth,setSelectedMonth,label,title,copy}){return <div className="finance-monthbar"><div><span className="card-kicker">{label}</span><h2 className="tracken-main-heading">{title}</h2><p className="tracker-copy">{copy}</p></div><input type="month" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}/></div>}
function Kpi({label,value,tone}){return <article><span>{label}</span><strong className={tone||""}>{value}</strong></article>}
function PanelHead({kicker,title,icon}){return <div className="panel-heading"><div><span className="card-kicker">{kicker}</span><h2>{title}</h2></div>{icon}</div>}
function Breakdown({title,rows,total}){return <div><div className="finance-section-title"><b>{title}</b><span>{rows.length} categories</span></div>{rows.length?rows.slice(0,8).map(([cat,val])=><div className="finance-bar-row" key={cat}><div><span>{cat}</span><b>{fmt(val)}</b></div><i><em style={{width:`${total?clamp(val/total*100,2,100):0}%`}}/></i></div>):<div className="finance-empty">No expenses recorded for this month.</div>}</div>}
function GoalFundingCard({activeGoals,selectedGoal,selectedGoalId,setSelectedGoalId,goalRemaining,plannedMonthly,goalMonths,totalGoalFundedThisMonth,contributionAmount,setContributionAmount,contributionNote,setContributionNote,contributing,contributeToGoal,goalMessage,savePlan,financeGoalForm,setFinanceGoalForm,createFinanceGoal,editingFinanceGoalId,cancelFinanceGoalEdit,setEditingFinanceGoalId}){const handleCreateFinanceGoal=()=>{const ok=createFinanceGoal?.(financeGoalForm,editingFinanceGoalId);if(ok){setFinanceGoalForm({title:"",target:"",saved:"",monthly:"",deadline:""});setEditingFinanceGoalId?.(null);}};return <article className="tracker-large-card finance-goal-card"><PanelHead kicker="GOAL FINANCE" title="Build and fund a money goal" icon={<Target size={20}/>}/><p className="tracker-copy finance-readable-copy">Finance goals are separate from your Study Goals. Create a money target here, decide how much you want to save each month, then record real contributions from Cashflow.</p><div className="finance-goal-create-grid"><input value={financeGoalForm.title} onChange={e=>setFinanceGoalForm({...financeGoalForm,title:e.target.value})} placeholder="Goal name e.g. Emergency fund"/><input type="number" min="0" value={financeGoalForm.target} onChange={e=>setFinanceGoalForm({...financeGoalForm,target:e.target.value})} placeholder="Target amount"/><input type="number" min="0" value={financeGoalForm.saved} onChange={e=>setFinanceGoalForm({...financeGoalForm,saved:e.target.value})} placeholder="Already saved"/><input type="number" min="0" value={financeGoalForm.monthly} onChange={e=>setFinanceGoalForm({...financeGoalForm,monthly:e.target.value})} placeholder="Monthly plan"/><input type="date" value={financeGoalForm.deadline} onChange={e=>setFinanceGoalForm({...financeGoalForm,deadline:e.target.value})}/><div className="finance-goal-create-actions"><button className="primary-small" onClick={handleCreateFinanceGoal}>{editingFinanceGoalId?"Save goal":"Create finance goal"}</button>{editingFinanceGoalId&&<button className="ghost-small" onClick={cancelFinanceGoalEdit}>Cancel</button>}</div></div>{activeGoals.length?<><div className="goal-finance-selector"><label>Finance goal<select value={selectedGoal?.id||selectedGoalId} onChange={e=>setSelectedGoalId(e.target.value)}>{activeGoals.map(g=><option key={g.id} value={g.id}>{g.title}</option>)}</select></label><div className="goal-finance-stats"><div><span>TARGET</span><b>{fmt(selectedGoal.target)}</b></div><div><span>SAVED</span><b>{fmt(selectedGoal.saved)}</b></div><div><span>REMAINING</span><b>{fmt(goalRemaining)}</b></div><div><span>MONTHLY PLAN</span><b>{plannedMonthly?fmt(plannedMonthly):"—"}</b></div></div></div><div className="finance-goal-progress"><div><b>{selectedGoal.title}</b><strong>{clamp(Math.round(Number(selectedGoal.saved||0)/Number(selectedGoal.target||1)*100),0,100)}%</strong></div><div className="finance-progress"><i style={{width:`${clamp(Number(selectedGoal.saved||0)/Number(selectedGoal.target||1)*100,0,100)}%`}}/></div></div><div className="finance-goal-action-row"><div><span>ESTIMATED TIME</span><strong>{goalMonths?`${goalMonths} month${goalMonths===1?"":"s"}`:"Set a monthly plan"}</strong><small>{selectedGoal.deadline?`Deadline ${selectedGoal.deadline}`:"No deadline set"}</small></div><div><span>FUNDED THIS MONTH</span><strong>{fmt(totalGoalFundedThisMonth)}</strong><small>Real contributions recorded in Cashflow.</small></div><button className="ghost-small" onClick={()=>{setFinanceGoalForm({title:selectedGoal.title,target:selectedGoal.target,saved:selectedGoal.saved,monthly:selectedGoal.monthly||"",deadline:selectedGoal.deadline||""});setEditingFinanceGoalId(selectedGoal.id);window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});}}>Edit goal</button></div><div className="goal-finance-action"><div><label>Monthly plan<input type="number" min="0" value={plannedMonthly||""} onChange={e=>savePlan(selectedGoal.id,e.target.value)} placeholder="₹ per month"/></label><small>Planning only. It does not move money.</small></div><div><label>Add real contribution<input type="number" min="0" max={goalRemaining} value={contributionAmount} onChange={e=>setContributionAmount(e.target.value)} placeholder="Amount"/></label><input value={contributionNote} onChange={e=>setContributionNote(e.target.value)} placeholder="Optional note"/><button className="primary-small" onClick={contributeToGoal} disabled={contributing}>{contributing?"Adding…":"Fund goal"}<ArrowRight size={15}/></button></div></div>{goalMessage&&<div className={`finance-goal-message ${goalMessage.startsWith("Added")?"success":"error"}`}><AlertTriangle size={14}/><span>{goalMessage}</span></div>}<p className="tracker-copy finance-goal-footnote">A funded contribution becomes a real Goal Funding entry in Cashflow and updates this finance goal. Study Goals remain completely separate.</p></>:<div className="finance-empty finance-readable-empty"><Target size={22}/><div><b>Create your first finance goal above.</b><span>Examples: Emergency fund, New phone, Vacation, Laptop, Down payment.</span></div></div>}</article>}
function CashflowAutomationCard(p){return <article className="tracker-large-card automation-center-card cashflow-automation-card"><div className="panel-heading"><div><span className="card-kicker">AUTOMATION CENTER · 04</span><h2>Recurring cashflow.</h2><p className="tracker-copy">Schedule income or expenses once. TRACKEN keeps your commitments visible and predictable.</p></div><WalletCards size={20}/></div><div className="automation-form-grid cashflow-automation-form"><input value={p.cashflowAutomationTitle} onChange={e=>p.setCashflowAutomationTitle(e.target.value)} placeholder="What should repeat? e.g. Rent"/><select value={p.cashflowAutomationType} onChange={e=>p.setCashflowAutomationType(e.target.value)}><option value="expense">Expense</option><option value="income">Income</option></select><input type="number" min="0" step="0.01" value={p.cashflowAutomationAmount} onChange={e=>p.setCashflowAutomationAmount(e.target.value)} placeholder="Amount"/><input value={p.cashflowAutomationCategory} onChange={e=>p.setCashflowAutomationCategory(e.target.value)} placeholder="Category"/><select value={p.cashflowAutomationFrequency} onChange={e=>p.setCashflowAutomationFrequency(e.target.value)}><option value="daily">Every day</option><option value="weekdays">Every weekday</option><option value="weekly">Every week</option><option value="monthly">Every month</option></select><input type="date" value={p.cashflowAutomationStartDate} onChange={e=>p.setCashflowAutomationStartDate(e.target.value)}/><input type="date" value={p.cashflowAutomationEndDate} onChange={e=>p.setCashflowAutomationEndDate(e.target.value)} title="Optional end date"/><button className="primary-small" onClick={p.createCashflowAutomation}><Plus size={15}/> Create automation</button></div><div className="automation-list">{(p.cashflowAutomationRules||[]).map(rule=><div className={`automation-rule ${rule.enabled?"active":"paused"}`} key={rule.id}><div className="automation-rule-icon"><WalletCards size={16}/></div><div className="automation-rule-main"><b>{rule.title} · {fmt(rule.amount)}</b><small>{rule.type==="income"?"Income":"Expense"} · {p.cashflowFrequencyLabel(rule.frequency)} · starts {rule.startDate}{rule.endDate?` · ends ${rule.endDate}`:""} · {rule.category||"General"}</small></div><span className="automation-status">{rule.enabled?"ACTIVE":"PAUSED"}</span><button className="ghost-small" onClick={()=>p.toggleCashflowAutomation(rule.id)}>{rule.enabled?"Pause":"Resume"}</button><button className="ghost-small danger-ghost" onClick={()=>p.deleteCashflowAutomation(rule.id)}><Trash2 size={14}/></button></div>)}{!(p.cashflowAutomationRules||[]).length&&<div className="automation-empty"><WalletCards size={22}/><div><b>No recurring cashflow rules yet.</b><small>Create one above for rent, salary, subscriptions, bills and more.</small></div></div>}</div></article>}
