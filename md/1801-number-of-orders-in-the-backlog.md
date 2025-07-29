### Leetcode 1801 (Medium): Number of Orders in the Backlog [Practice](https://leetcode.com/problems/number-of-orders-in-the-backlog)

### Description  
You're asked to process a **list of buy and sell stock orders** where each order has a price, amount, and type (`0` for buy, `1` for sell).  
Orders are processed **sequentially**, and each new order tries to match with the best existing opposite order in the backlog, using these rules:
- A **buy order** matches with the lowest-priced sell order (where sell price ≤ buy price).
- A **sell order** matches with the highest-priced buy order (where buy price ≥ sell price).
- If a match is possible, amounts are reduced accordingly. If the order cannot be fully matched, the remaining amount goes into the backlog.

After all orders are processed, return **the total amount of orders still left in the backlog**, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input:  
`orders = [[10, 5, 0], [15, 2, 1], [25, 1, 1], [30, 4, 0]]`  
Output:  
`6`  
*Explanation:*  
- Place buy order at price 10 for 5 units → buy backlog: [10@5]
- Place sell order at price 15 for 2 units. No buy order with price ≥ 15, so add to sell backlog: [15@2]
- Place sell order at price 25 for 1 unit. No buy order with price ≥ 25, so add to sell backlog: [15@2, 25@1]
- Place buy order at price 30 for 4 units. It fulfills 2 units with sell at 15, 1 unit with sell at 25 (all at prices ≤ 30). Leftover: 1 buy at 30.
- Backlog: buy [10@5, 30@1], sell []; total units = 5+1 = 6

**Example 2:**  
Input:  
`orders = [[7, 1000000000, 1], [15, 3, 0], [5, 999999995, 0], [5, 1, 1]]`  
Output:  
`999999984`  
*Explanation:*  
- Place sell order at 7 for 1e9 → sell backlog: [7@1e9]
- Place buy order at 15 for 3 units. Fulfills 3 units from sell at 7. sell@7 now 999,999,997 left.
- Place buy order at 5 for 999,999,995 units. No sell order at ≤ 5, so add to buy backlog: [5@999,999,995]
- Place sell order at 5 for 1 unit. No buy order at ≥ 5, sell backlog: [7@999,999,997, 5@1]
- Backlog: 999,999,995 buy (5@), 999,999,998 sell, total = 999,999,995 + 999,999,998 = 1,999,999,993 % 1e9+7 = 999,999,984

**Example 3:**  
Input:  
`orders = [[1,2,0],[2,1,1],[2,2,0],[1,1,1]]`  
Output:  
`2`  
*Explanation:*  
- Buy 2 @ 1 → buy backlog: [1@2]
- Sell 1 @ 2 → buy order at 1 cannot fulfill (buy must be ≥ sell), so add sell: [2@1]
- Buy 2 @ 2 → can fulfill 1 at sell 2@1. Remain: buy 2@1
- Sell 1 @ 1: fulfilled by buy 2@1 (now buy backlog is empty), sell backlog: []

### Thought Process (as if you’re the interviewee)  
- The problem is about simulating a stock exchange **order book**.
- Brute-force: Loop through the unanswered backlog for each new order, finding matches. This is too slow: backlog could be very large.
- Optimization:  
  - Use a **max-heap for buy backlog** (want to quickly find max buy price for matching with sells) and a **min-heap for sell backlog** (to find min sell price for matching with buys).
  - For each order, attempt to greedily match it with the best available opposite order in the backlog, satisfying the price condition.
  - When matching, reduce the amounts appropriately. Orders are only added to the heap if they cannot be completely matched.
- This efficiently allows matching in O(log n) per addition/removal from heaps.

### Corner cases to consider  
- orders list is empty (result is 0)
- All orders match completely so final backlog is empty
- Orders with extremely large amounts (must take modulo 10⁹+7)
- Same price but opposite types in input
- Multiple orders at the same price and type stacking in backlog
- Orders with zero amount (should be ignored)

### Solution

```python
def getNumberOfBacklogOrders(orders):
    # buy: max-heap (by price), sell: min-heap (by price)
    import heapq
    MOD = 10**9 + 7
    buy_heap = []   # Each element: (-price, amount)
    sell_heap = []  # Each element: (price, amount)
    
    for price, amount, order_type in orders:
        if order_type == 0:
            # Buy order: try to match with lowest price sell
            while sell_heap and amount > 0 and sell_heap[0][0] <= price:
                sell_price, sell_amount = heapq.heappop(sell_heap)
                match_amount = min(amount, sell_amount)
                amount -= match_amount
                sell_amount -= match_amount
                if sell_amount > 0:
                    heapq.heappush(sell_heap, (sell_price, sell_amount))
            if amount > 0:
                heapq.heappush(buy_heap, (-price, amount))
        else:
            # Sell order: try to match with highest price buy
            while buy_heap and amount > 0 and -buy_heap[0][0] >= price:
                buy_price, buy_amount = heapq.heappop(buy_heap)
                match_amount = min(amount, buy_amount)
                amount -= match_amount
                buy_amount -= match_amount
                if buy_amount > 0:
                    heapq.heappush(buy_heap, (buy_price, buy_amount))
            if amount > 0:
                heapq.heappush(sell_heap, (price, amount))
    
    total = 0
    for _, amt in buy_heap:
        total = (total + amt) % MOD
    for _, amt in sell_heap:
        total = (total + amt) % MOD
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Each order may insert or remove from either heap, and every heap operation is log k (k ≤ n), so for n orders total is O(n log n).
- **Space Complexity:** O(n)  
  Each heap can contain at most n orders if there are no matches at all. No recursion; only stores unfulfilled orders.

### Potential follow-up questions (as if you’re the interviewer)  

- What if orders could be canceled after being placed in the backlog?  
  *Hint: Consider how you might efficiently remove an arbitrary item from a heap.*

- What if the price precision is much higher (e.g., not just integers)?  
  *Hint: Can you use the same min-heap and max-heap structure with floating point? Any risks?*

- Suppose multiple orders arrive at the same timestamp. How would you handle priorities?  
  *Hint: Is order of arrival a consideration in your current logic? Will you need to store timestamps with orders?*

### Summary
This problem uses the "simulate a system with optimal data structures" pattern, specifically with **double-priority queues (heaps)** to keep quick access to best buy and sell orders. This is a classic **order-matching / simulation** and **heap (priority queue) application**.  
The same approach can be applied in real-time marketplaces, job schedulers, or any situation where efficient retrieval of the minimum/maximum is crucial for matching resources or tasks.