### Leetcode 2517 (Medium): Maximum Tastiness of Candy Basket [Practice](https://leetcode.com/problems/maximum-tastiness-of-candy-basket)

### Description  
You are given an array `price`, where each value represents the price of a candy, and an integer `k`. You want to pick `k` candies (distinct indices) such that the **tastiness** of the selection is maximized. The **tastiness** is defined as the *minimum* absolute difference between prices of any two candies in your selection. Find and return the largest possible tastiness value.

### Examples  

**Example 1:**  
Input: `price = [13, 5, 1, 8, 21, 2], k = 3`  
Output: `8`  
*Explanation: Pick candies with prices 1, 9, and 17. The minimum absolute difference between each pair is 8. No better sequence gives a larger minimum absolute difference.*

**Example 2:**  
Input: `price = [1,3,1], k = 2`  
Output: `2`  
*Explanation: Pick 1 and 3: absolute difference is 2 (maximum possible with 2 candies).*

**Example 3:**  
Input: `price = [7,7,7,7], k = 2`  
Output: `0`  
*Explanation: All prices are equal, so minimum absolute difference is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try all possible combinations of k prices, check the minimum pairwise difference for each, and keep track of the largest among them. But this is not feasible due to combinatorial explosion.
- **Observation:**  
  Sorting the prices helps — the minimum difference for any selection will always be between consecutive numbers after sorting.
- **Optimized approach:**  
  Use **binary search** on the answer (tastiness). For a given candidate tastiness `x`, check if you can pick k prices with each being at least `x` apart.  
  - For each binary search middle value (`mid`), use a **greedy** approach: Start from the lowest price, keep picking the next price that is at least `mid` higher than the previous pick, counting until you have k candies.  
  - If you can pick k candies, try a larger tastiness (move binary search right), else decrease (move left).  
  - The search range is from 0 to max(price) - min(price).

### Corner cases to consider  
- All prices are the same (tastiness is 0).
- k = 1 (no pair, so tastiness is undefined, but can be taken as any value, usually 0).
- k equals length of price array.
- price contains negative, zero, or large numbers.
- price is already sorted or reverse-sorted.

### Solution

```python
def maximumTastiness(price, k):
    # Sort prices to make picking easier and the greedy approach possible
    price.sort()
    n = len(price)
    
    # Binary search between 0 and largest possible difference
    left, right = 0, price[-1] - price[0]
    result = 0
    
    def can_pick_with_distance(d):
        # Greedily select the sequence with at least `d` difference
        count = 1  # always pick first
        last = price[0]
        for i in range(1, n):
            if price[i] - last >= d:
                count += 1
                last = price[i]
                if count == k:
                    return True
        return False
    
    while left <= right:
        mid = (left + right) // 2
        if can_pick_with_distance(mid):
            result = mid  # possible, try larger
            left = mid + 1
        else:
            right = mid - 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Sorting takes O(n log n). For each binary search step (O(log M), where M is the price range), we perform a linear pass (O(n)) to check feasibility. So overall: O(n log n + n log M).
- **Space Complexity:**  
  O(1) extra — just a few helper variables and the sorted array (if sorting in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return one valid combination of prices achieving the maximum tastiness?  
  *Hint: Track the sequence of picks during the "can_pick_with_distance" step.*

- How would you optimize the solution if k is very close to n?  
  *Hint: Maybe use the pigeonhole principle or sliding window approaches for related variations.*

- What if the price distribution is highly skewed or extremely large numbers are present?  
  *Hint: Consider integer overflow, and maybe, replace subtraction with more robust difference calculations.*

### Summary
This problem uses a **binary search on the answer** pattern, combined with a greedy check for feasibility at each step. This is common in problems where you want to maximize or minimize some minimum or maximum value under selection constraints — such as aggressive cows (minimum distance among k items), split array variants, or distributing objects with separation requirements. The core pattern (sort, greedy check, binary search on answer) is widely reusable for candy distribution, aggressive placements, and packing type problems.