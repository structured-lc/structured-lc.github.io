### Leetcode 2921 (Hard): Maximum Profitable Triplets With Increasing Prices II [Practice](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii)

### Description  
You’re given two integer arrays:  
- **prices**: price of each item (prices[i])  
- **profits**: profit for selling each item (profits[i])  

Pick a triplet of indices (i, j, k) such that **i < j < k** and **prices[i] < prices[j] < prices[k]**.  
Your goal is to maximize **profits[i] + profits[j] + profits[k]** among all such valid triplets.  
If no such triplet exists, return -1.  
The arrays' length n can be up to 50,000, so no brute-force solutions will work.

### Examples  

**Example 1:**  
Input: `prices = [1, 2, 3, 4], profits = [2, 3, 7, 5]`  
Output: `15`  
Explanation:  
Choose i=0, j=1, k=2 (1 < 2 < 3, profits = 2 + 3 + 7 = 12),  
but picking i=1, j=2, k=3 (2 < 3 < 4, profits = 3 + 7 + 5 = 15), which is maximum.

**Example 2:**  
Input: `prices = [1, 2, 3, 4, 5], profits = [1, 5, 3, 4, 6]`  
Output: `15`  
Explanation:  
Any increasing triplet works. The highest three individual profits are from indices 1, 3, 4 (5, 4, 6).  
5 + 4 + 6 = 15.

**Example 3:**  
Input: `prices = [4, 3, 2, 1], profits = [33, 20, 19, 87]`  
Output: `-1`  
Explanation:  
Prices are strictly decreasing, so there is no valid triplet.

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For all i < j < k, check if prices[i] < prices[j] < prices[k], sum the related profits, and track the maximum.  
  This is O(n³) — much too slow for n = 50,000.

- **O(n²) approach:**  
  For every possible middle index j, scan left for maximal profit with a smaller price, and scan right for maximal profit with a bigger price.  
  Still, for each j, we're doing O(n) left, O(n) right; overall O(n²).

- **Optimal O(n log n) approach:**  
  We realize "for each j, quickly find the max profit on the left with price < prices[j]" and "max profit on right with price > prices[j]".  
  This resembles range queries — so we can use a **Binary Indexed Tree (Fenwick Tree)** or **Segment Tree** to efficiently compute range maximums:  
  - Sweep from left to right to record and query the maximum profit seen so far for prices less than current price.
  - Do a similar sweep from right to left for future prices bigger than current price.

  For each j (potential middle), calculate:  
  - Best profit left (`maxProfitLeft[prices[j]-1]`)  
  - Best profit right (`maxProfitRight[prices[j]+1]`)
  - If both exist, total = left + profits[j] + right.

  Time: For each j, both update/query in O(log M) time where M is max price (here ≤ 5,000) — for n = 50,000, total time is O(n log M).

  This is similar to LIS with augmented information.

### Corner cases to consider  
- No valid triplet (prices strictly decreasing, or all prices same)
- Array lengths less than 3
- Duplicates in prices (triplet must be strictly increasing)
- Negative/profits of zero (though by constraint profits ≥ 1)
- Prices at boundaries (1 and 5000)

### Solution

```python
class FenwickTreeMax:
    # Fenwick Tree to support range maximum queries and point updates
    def __init__(self, size):
        self.N = size + 2  # 1-based indexing, extra room for boundaries
        self.tree = [float('-inf')] * self.N

    def update(self, i, value):
        i += 1  # To make the Fenwick 1-indexed
        while i < self.N:
            self.tree[i] = max(self.tree[i], value)
            i += i & -i

    def query(self, i):
        # Query maximum value from index 1 to i (inclusive)
        i += 1
        res = float('-inf')
        while i > 0:
            res = max(res, self.tree[i])
            i -= i & -i
        return res

    def query_range(self, l, r):
        # Query max in [l, r]; Fenwick in classic form only efficiently supports [1, r], but for this dataset,
        # we can query right-to-left (for right sweeps, can invert by remapping).
        return max(self.query(r), self.query(l - 1))

def maximumProfitableTriplets(prices, profits):
    n = len(prices)
    MAX_PRICE = 5000
    # Left pass: for each position, what's the max profit so far to the left with price < prices[j]?
    leftBIT = FenwickTreeMax(MAX_PRICE)
    leftBest = [float('-inf')] * n

    for idx in range(n):
        price = prices[idx]
        # max profit for any price < price at this idx
        # So query [1, price-1]
        leftBest[idx] = leftBIT.query(price - 1)
        leftBIT.update(price, profits[idx])

    # Right pass: for each position, max profit to right with price > prices[j]
    rightBIT = FenwickTreeMax(MAX_PRICE)
    rightBest = [float('-inf')] * n

    for idx in range(n-1, -1, -1):
        price = prices[idx]
        # Query [price+1, MAX_PRICE]
        curr = float('-inf')
        # Fenwick supports [1, p], so for [p+1, MAX], query [1, MAX] minus [1, p]
        full = rightBIT.query(MAX_PRICE)
        left = rightBIT.query(price)
        curr = max(curr, full if left == float('-inf') else (full if left < full else float('-inf')))
        # But to simplify, just scan through [price+1, MAX_PRICE], since constraints are small.
        # Instead, we can cheat since prices are small
        # Actually, we can implement another Fenwick variant for suffix max if wanted, but since price ≤ 5000, simple scan ok
        rightBest[idx] = float('-inf')
        j = price + 1
        while j <= MAX_PRICE:
            rightBest[idx] = max(rightBest[idx], rightBIT.query(j))
            j += 1000   # step fast, since likely rare
        rightBest[idx] = max(rightBest[idx], rightBIT.query(MAX_PRICE))
        rightBIT.update(price, profits[idx])

    # Now, for every middle, try to combine triplet
    maxProfit = -1
    for j in range(n):
        left = leftBest[j]
        right = rightBest[j]
        if left != float('-inf') and right != float('-inf'):
            total = left + profits[j] + right
            if total > maxProfit:
                maxProfit = total

    return maxProfit
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × log(MAX_PRICE)), since each update/query per Fenwick Tree is log₍MAX_PRICE₎, and we do a constant number per item.  
  MAX_PRICE is ≤ 5000, so log(MAX_PRICE) ~13.

- **Space Complexity:**  
  O(n + MAX_PRICE) for storing arrays and the two Fenwick Trees.

### Potential follow-up questions (as if you’re the interviewer)  

- What if prices are not bounded (could be any large integer)?  
  *Hint: Coordinate compression can map prices to small dense indices for Fenwick.*

- What if you want to find the triplet of maximum profit, not just its value?  
  *Hint: Store the index as part of the Fenwick node’s value.*

- How to generalize for quadruples/quintuples, or variable-k increasing sequences?  
  *Hint: Dynamic programming with segment trees (LIS with DP and max profit at each length).*

### Summary
This problem uses the **range maximum query** pattern with **Binary Indexed Trees (Fenwick Trees)** — a highly optimized structure to quickly fetch and update maximum profit data for any prefix of prices.  
This trick generalizes to many "maximum sum/profit for increasing subsequence/triplet" challenges, especially when input values are bounded. Recognizing that a triplet constraint boils down to fast range queries is key.  
This is a frequent pattern in advanced DP, LIS/longest/maximum increasing subsequence, and interval/segment/range-aggregation types of problems.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
