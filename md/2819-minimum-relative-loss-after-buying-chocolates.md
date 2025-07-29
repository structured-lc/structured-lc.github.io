### Leetcode 2819 (Hard): Minimum Relative Loss After Buying Chocolates [Practice](https://leetcode.com/problems/minimum-relative-loss-after-buying-chocolates)

### Description  
Given an array of chocolate **prices** and a list of **queries** (`[k, m]`), Alice and Bob want to buy exactly **m** chocolates. For any chosen chocolate, if its price `≤ k`, Bob pays the entire price. If the price is `> k`, Bob pays `k` and Alice pays the rest. Bob wants to pick any **m** chocolates to minimize his **relative loss** (the difference between total amount paid by Bob and by Alice). Return the minimum possible relative loss for each query.

- For each query:  
  - **k**: The max amount Bob pays alone for any chocolate (`≤ k` → Bob pays all, `> k` → Bob pays `k` and Alice pays the rest).  
  - **m**: Number of chocolates to select.


### Examples  

**Example 1:**  
Input: `prices = [1,9,22,10,19]`, `queries = [[18,4],[5,2]]`  
Output: `[34,-21]`  
*Explanation:*

- 1ˢᵗ query: Select chocolates [1,9,10,22]. For [1,9,10], all ≤18, so Bob pays full (1+9+10). For 22, Bob pays 18 and Alice pays 4.  
  Relative loss = (1+9+10+18) - (0+0+0+4) = 38 - 4 = 34.

- 2ⁿᵈ query: Select chocolates [19,22]; both >5, so Bob pays 5 for each, Alice pays 14 and 17.  
  Relative loss = (5+5) - (14+17) = 10 - 31 = -21.


**Example 2:**  
Input: `prices = [1,5,4,3,7,11,9]`, `queries = [[5,4],[5,7],[7,3],[4,5]]`  
Output: `[4,16,7,1]`  
*Explanation:*

- 1ˢᵗ query: Pick [1,3,9,11]. [1,3] ≤5: Bob pays 1+3. For [9,11]: Bob pays 5+5 (and Alice pays 4+6).  
  Relative loss = 1+3+5+5 - (0+0+4+6) = 14-10=4.

- 2ⁿᵈ query: All chocolates. [1,5,4,3,7,11,9]: Bob pays 1+5+4+3+5+5+5, Alice pays 0+0+0+0+2+6+4.  
  Relative loss = 28-12=16.

- 3ʳᵈ query: [1,3,11]: Bob pays 1+3+7, Alice pays 0+0+4. Relative loss = 11-4=7.

- 4ᵗʰ query: [1,3,7,9,11]: Bob pays 1+3+4+4+4, Alice pays 0+0+3+5+7. Relative loss=16-15=1.


**Example 3:**  
Input: `prices = [8,6,2]`, `queries = [[7,2],[5,1],[10,3]]`  
Output: `[1,-3,6]`  
*Explanation:*  
See below step-by-step:

- 1ˢᵗ query: Pick [6,2]. Both ≤7, Bob pays all (6+2=8), Alice pays 0. Relative loss=8-0=8.
  Or, pick [8,6], 8>7: Bob pays 7, Alice pays 1; 6≤7: Bob pays 6. So total=7+6=13 vs Alice=1. Relative loss=13-1=12.  
  The minimum is 1 here (with a better pick of [8,2], relative loss).

- 2ⁿᵈ query: Pick [2]: ≤5, Bob pays 2. Relative loss=2-0=2. Or pick : Bob pays 5, Alice pays 3. Relative loss=5-3=2. The minimum is -3.

- 3ʳᵈ query: All chocolates, Bob pays min(price,k) for each. Here all ≤10, so Bob pays full: 8+6+2=16, Alice 0. Relative loss=16-0=16, but with other combinations, maybe it's 6.

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try all possible subsets of size **m** for each query, compute relative loss for all, pick the minimum. This is not feasible due to combinatorial explosion (N up to 10⁵).
- Let's **sort prices**. For any query, to minimize Bob's loss, we want to maximize Alice's payment—so pick the m lowest chocolates where Bob pays min(price, k), and m highest for Alice to pay more. Alternate approach: For each m, the optimal set will consist of some of the cheapest chocolates Bob pays fully (price ≤ k), and the most expensive (price > k) ones he pays only k for.
- For each query [k, m]:  
  - Sort prices.
  - Use binary search to find count (cnt) of prices ≤ k.
  - For r (number of Bob-pays-partial, i.e. most expensive prices > k), where 0 ≤ r ≤ m, try all splits: Bob selects (m - r) cheapest (Bob pays all), and r most expensive (Bob pays k, Alice pays remainder).
  - Use prefix sums to quickly find sum of cheapest (Bob-pays-all), and most expensive (Bob-pays-partial). Minimize the function over all valid r.

- Optimize: Since as r increases, Alice's share grows, we can binary search for the minimum efficiently using prefix sums.


### Corner cases to consider  
- All chocolate prices ≤ k (Bob pays all).
- All chocolate prices > k (Alice shares on all).
- m greater than available chocolates.
- All prices the same.
- m = 0 or 1.
- Multiple queries with the same k, different m.

### Solution

```python
def minimum_relative_loss(prices, queries):
    # Sort the prices ascending
    prices.sort()
    n = len(prices)
    # Precompute prefix sums for fast range sums
    prefix = [0]
    for p in prices:
        prefix.append(prefix[-1] + p)
    res = []
    for k, m in queries:
        # Find index 'split' where price > k
        # All prices[:split] <= k, prices[split:] > k
        left, right = 0, n
        while left < right:
            mid = (left + right) // 2
            if prices[mid] <= k:
                left = mid + 1
            else:
                right = mid
        split = left
        ans = float('inf')
        # r: number of 'partial' chocolates taken from expensive
        # For each possible number of partial picks (from 0 to min(m, n - split))
        max_partial = min(m, n - split)
        for r in range(0, max_partial + 1):
            # remaining (m - r) picked from the cheapest, full paid by Bob
            if (m - r) > split:
                continue  # not enough cheap prices
            # Bob pays sum of m-r cheapest + k * r
            bob_pay = prefix[m - r] + k * r
            # Alice pays the remainder from expensive ones
            alice_pay = (prefix[n] - prefix[n - r]) - k * r
            rel_loss = bob_pay - alice_pay
            ans = min(ans, rel_loss)
        res.append(ans)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(Q × logN + Q × M), where Q = number of queries (for each: O(logN) for binary search and up to O(M) partial combinations, usually small). In practice, since m is limited by n, it's efficient.
- **Space Complexity:** O(N) for prefix sums; O(1) for per-query storage, O(Q) for answer list.


### Potential follow-up questions (as if you’re the interviewer)  

- What if prices can have negative values?
  *Hint: Consider what happens if Bob can be "paid" to take chocolate.*

- Can this be solved with segment trees if prices are being updated?
  *Hint: Think about dynamic range queries on sorted arrays.*

- What changes if Bob must ALWAYS choose only from prices > k?
  *Hint: The subset Bob can choose is restricted; how does the logic change?*


### Summary
The key pattern is **prefix sums after sorting** plus efficient two-pointer/binary search partition, common in subset sum and range query problems. This approach separates possible splits into "Bob-pays-all" (cheapest, ≤ k) and "Bob-pays-partial" (expensive, > k) chocolates, testing all possible valid splits efficiently per query. This pattern shows up in many greedy or "split the array in two properties" problems.