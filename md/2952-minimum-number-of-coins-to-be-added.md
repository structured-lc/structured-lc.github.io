### Leetcode 2952 (Medium): Minimum Number of Coins to be Added [Practice](https://leetcode.com/problems/minimum-number-of-coins-to-be-added)

### Description  
Given an array `coins` representing coin denominations and an integer `target`, determine the minimum number of new coins (of any denomination) you need to add so that you can form every number from 1 up to `target` (inclusive) using some subset of the *sequence* (subsequence means order is preserved) of the resulting array. 

For every integer x in [1, target], you need to be able to pick a subsequence of the coins (existing + added) whose sum is exactly x.

### Examples  

**Example 1:**  
Input: `coins = [1,3], target = 6`  
Output: `1`  
*Explanation: The achievable sums before adding coins are: 1 (choose 1), 3 (choose 3), 4 (subsequence 1,3). Missing numbers: 2, 5, 6.  
If we add 2, coins = [1,2,3]. We can form sums: 1,2,3,1+2=3,1+3=4,2+3=5,1+2+3=6.  
So, 1 new coin is needed.*

**Example 2:**  
Input: `coins = [2], target = 5`  
Output: `2`  
*Explanation: We have only [2]. Sums formable: 2.  
Need to add 1, then coins=[1,2], can form 1,2,3.  
Need to add 3 to get 4 and 5: coins=[1,2,3].  
Adding [1,3] or [1,4] is also valid, but always need at least 2 extra coins.*

**Example 3:**  
Input: `coins = [1,2,2], target = 5`  
Output: `0`  
*Explanation: Already can form 1 (1), 2 (2), 1+2=3, 2+2=4, 1+2+2=5 with the existing coins. No new coin is needed.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea:** Try every possible set of numbers up to `target`, and for every missing value, add a coin, keep recalculating—exponential and not practical.
- **Optimized Greedy:**  
  - Sort coins.
  - Track current max value `reach` we can form (initialize as 0, since we can always make 0 with empty subsequence).
  - For every coin:
    - If the current coin ≤ reach+1, we can extend `reach` by using the coin.
    - Otherwise, we must add a coin of value `reach+1` to cover the gap, update count.
  - Repeat until reach ≥ target.
  - This is similar to the "Patching Array" problem/pattern.

**Why is this optimal?**  
Each time we can't reach `reach+1` with the next available coin or added coins, adding `reach+1` maximally expands the range we can get with minimal additions.

### Corner cases to consider  
- Empty `coins` array (must patch everything from 1 upward)
- All coins are larger than 1 (can’t reach 1, so must add a 1)
- All coins are already small (maybe don't need any extra coins)
- Duplicated coin values
- `target` is smaller than the smallest coin
- Coin denominations do NOT include 1

### Solution

```python
def minimumAddedCoins(coins, target):
    # Sort coins for greedy process
    coins.sort()
    reach = 0  # current max value we can form
    added = 0
    i = 0  # pointer to coins
    
    # Continue until we've covered all sums up to target
    while reach < target:
        # Use available coin if its value is ≤ reach+1 (no gap)
        if i < len(coins) and coins[i] <= reach + 1:
            reach += coins[i]
            i += 1
        else:
            # Need to patch a coin of value (reach+1)
            # This addition potentially doubles the reachable range
            reach += reach + 1
            added += 1
            
    return added
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the coins. The main while loop is O(n + k), where k is the number of added coins and n is the original coin array length (since each step either consumes a coin or adds one).
- **Space Complexity:** O(1) extra space, aside from input storage. We only use counters and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are only allowed to add coins of denominations not already present in `coins`?  
  *Hint: Greedy still applies, but need to check not to add a denomination twice.*

- What if coin usage is limited (each coin can be used only once)?  
  *Hint: Need DP or subset-sum style algorithm; greedy won't be correct.*

- What if you need to return the *actual* denominations to be added, not just the count?  
  *Hint: Store the value `reach+1` each time you patch, and return the list.*

### Summary
This problem uses a **greedy patching pattern**—always extend the constructed number range by the smallest missing value, similar to the classic "Patching Array" type problems. The greedy choice can maximally increase reach in every step, ensuring minimum additions. This approach (greedily "patching" the current smallest missing sum) is common in problems that cover an interval with minimal objects—very applicable anywhere you're asked how to achieve all sums/ranges with minimal insertions/extensions.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Coin Change(coin-change) (Medium)
- Most Expensive Item That Can Not Be Bought(most-expensive-item-that-can-not-be-bought) (Medium)