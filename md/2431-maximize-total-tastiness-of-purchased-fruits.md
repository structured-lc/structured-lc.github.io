### Leetcode 2431 (Medium): Maximize Total Tastiness of Purchased Fruits [Practice](https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits)

### Description  
Given **two integer arrays, `price` and `tastiness`, both of size n**, and two integers **`maxAmount`** (your total budget) and **`maxCoupons`** (the maximum coupons you can use), you can buy each fruit at most once. Each coupon lets you buy a fruit for half its price (rounded down), used at most once per fruit, and you can use at most `maxCoupons` coupons overall.  
**Goal:** Select fruits and decide for each whether to use a coupon, so that the **total tastiness** is maximized **without the total cost exceeding `maxAmount`**.

### Examples  

**Example 1:**  
Input: `price = [10,20,20]`, `tastiness = [5,8,8]`, `maxAmount = 20`, `maxCoupons = 1`  
Output: `13`  
*Explanation: Buy the 1ˢᵗ fruit (10, tastiness 5) at full price. Buy the 2ⁿᵈ fruit (20, tastiness 8) with a coupon (cost = 10). Total = 10+10 = 20 spent; tastiness = 5+8=13. Do not buy the 3ʳᵈ fruit. This is the best possible.*

**Example 2:**  
Input: `price = [5,3,8]`, `tastiness = [10,5,15]`, `maxAmount = 10`, `maxCoupons = 2`  
Output: `25`  
*Explanation: Buy fruit 1 (5, 10) at full price, fruit 2 (3, 5) at coupon price (1), and fruit 3 (8, 15) at coupon price (4). This actually exceeds coupons allowed—so the optimal: buy fruits 1 (full price), 3 (coupon price 4): cost 5+4=9≤10, tastiness 10+15=25.*

**Example 3:**  
Input: `price = [2,2,2]`, `tastiness = [2,2,2]`, `maxAmount = 1`, `maxCoupons = 2`  
Output: `0`  
*Explanation: Even at coupon price (1), each fruit costs 1, but maxAmount is 1. Can only buy one fruit (tastiness=2), but to maximize total, no combination gives more.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to try every selection of fruits and coupons—since each fruit can either not be bought, bought without coupon, or with coupon (if coupons left), that’s up to 3ⁿ combinations (slow!).

A better idea is to **use Dynamic Programming**.  
Define `dp[i][money][coupons]` = maximum tastiness using the first `i` fruits, with `money` money spent, and `coupons` used.

At each fruit `i`, there are 3 choices:
- **Skip** fruit i (no cost, tastiness as is)
- **Buy without coupon** (if enough money left)
- **Buy with coupon** (if coupons left and enough money left)

Transitions:
- Update DP for each choice (move to next fruit, adjust budget and coupons accordingly).

At the end, the maximal value in DP where money ≤ maxAmount and coupons ≤ maxCoupons, across all i, is the answer.

**Trade-offs:**  
- DP table can be large (n × maxAmount × maxCoupons), but n is small (≤ 100), and maxAmount, maxCoupons are moderate (≤ 10⁴).  
- Time and space O(n × maxAmount × maxCoupons), acceptable for typical constraints.

### Corner cases to consider  
- **No fruits** (empty input lists)
- **Zero coupons** (must buy at full price)
- **Zero maxAmount** (cannot buy anything)
- **Coupons > n** (should clamp at n)
- **price[i]=0** (free fruit)
- **All tastiness=0** (maximum achievable is 0)
- **Some prices > maxAmount** (can’t possibly buy those fruits)
- **Single fruit cases**

### Solution

```python
def maximize_tastiness(price, tastiness, maxAmount, maxCoupons):
    n = len(price)
    # dp[money][coupons] = max total tastiness with budget 'money' and using 'coupons'
    dp = [[-1] * (maxCoupons + 1) for _ in range(maxAmount + 1)]
    dp[0][0] = 0  # Start with no fruits purchased

    for i in range(n):  # For each fruit
        next_dp = [row[:] for row in dp]  # Copy for updates
        for cur_money in range(maxAmount + 1):
            for cur_coupons in range(maxCoupons + 1):
                if dp[cur_money][cur_coupons] == -1:
                    continue
                # 1. Skip fruit i (do nothing)
                # 2. Buy without coupon
                new_cost = cur_money + price[i]
                if new_cost <= maxAmount:
                    if next_dp[new_cost][cur_coupons] < dp[cur_money][cur_coupons] + tastiness[i]:
                        next_dp[new_cost][cur_coupons] = dp[cur_money][cur_coupons] + tastiness[i]
                # 3. Buy with coupon (if coupons left)
                if cur_coupons < maxCoupons:
                    coupon_cost = cur_money + (price[i] // 2)
                    if coupon_cost <= maxAmount:
                        if next_dp[coupon_cost][cur_coupons + 1] < dp[cur_money][cur_coupons] + tastiness[i]:
                            next_dp[coupon_cost][cur_coupons + 1] = dp[cur_money][cur_coupons] + tastiness[i]
        dp = next_dp

    # Find the maximal achievable tastiness
    max_tastiness = 0
    for money in range(maxAmount + 1):
        for coupons in range(maxCoupons + 1):
            if dp[money][coupons] != -1:
                if dp[money][coupons] > max_tastiness:
                    max_tastiness = dp[money][coupons]
    return max_tastiness
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × maxAmount × maxCoupons)  
  For each fruit, for each budget up to maxAmount, for each possible number of coupons up to maxCoupons, all are looped.
- **Space Complexity:** O(maxAmount × maxCoupons)  
  Only two 2D arrays of this size are needed (current and next DP state).

### Potential follow-up questions (as if you’re the interviewer)  

- If the array size or maxAmount were much larger, how could you optimize the space or time?
  *Hint: Can you compress the DP dimension or use less memory?*

- What if you could buy each fruit unlimited times?
  *Hint: Relax the DP to “unbounded knapsack” semantics.*

- Suppose prices can be negative (you get paid to take a fruit), how does your code handle it?
  *Hint: Think about cycles and knapsack with negative values.*

### Summary
This problem is a direct application of the **Knapsack DP Pattern with an extra resource constraint** (coupons). Variations of this idea are common in resource allocation and optimization problems—look for dual-resource DP techniques. Techniques for reducing DP dimensions (e.g., rolling arrays, pruning) are useful when either constraint can be very large.


### Flashcard
DP with states dp[i][money][coupons] tracking maximum tastiness. Three choices per fruit: skip, buy normally, or buy with coupon if available.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
