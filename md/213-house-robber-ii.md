### Leetcode 213 (Medium): House Robber II [Practice](https://leetcode.com/problems/house-robber-ii)

### Description  
You are a robber planning to maximize the amount of money you can steal from a circle of houses, where each house has some non-negative money. However, you can't rob two adjacent houses, and because of the circular arrangement, the first and last houses are also adjacent. Return the maximum money you can rob without ever robbing two neighbors.

### Examples  

**Example 1:**  
Input: `nums = [2,3,2]`  
Output: `3`  
Explanation:  
You cannot rob the first and last house (both have 2) because they are neighbors in the circle, so the best you can do is rob only the middle house (3).

**Example 2:**  
Input: `nums = [1,2,3,1]`  
Output: `4`  
Explanation:  
Rob house 0 (1) and house 2 (3): 1 + 3 = 4.  
Can't rob both ends (index 0 and index 3) because they're adjacent.

**Example 3:**  
Input: `nums = [1]`  
Output: `1`  
Explanation:  
Only one house to rob; take what you can!

### Thought Process (as if you’re the interviewee)  
First, recall the classic "House Robber" (Leetcode 198) where houses are arranged in a straight line. There, the optimal substructure lets us use dynamic programming to decide, for each house, whether to rob it (and skip its neighbor) or skip it.

With the houses in a circle, the first and last houses are also neighbors. That means we can't rob both the first and last houses together.  
To handle this, break the problem into two scenarios:
- Rob houses 0 to n-2 (skipping the last).
- Rob houses 1 to n-1 (skipping the first).

Compute the best total for both cases using the original House Robber logic, then take the maximum.  
For house counts:
- One house: return its value.
- Two houses: return the max of the two.

This approach leverages the dynamic programming technique but sidesteps the circular conflict by splitting the range.

### Corner cases to consider  
- Empty array: `[]`
- Only one house: `[x]`
- Two houses: `[x, y]`
- All zeros: `[0,0,0]`
- All houses have the same value: `[5,5,5,5]`
- Large values or maximum input length
- Houses with alternating high and low values

### Solution

```python
def rob(nums):
    # Helper function for classic House Robber on linear array
    def rob_linear(houses):
        prev_max = 0
        curr_max = 0
        for amount in houses:
            # Decide: rob this house (prev_max + amount) or skip (curr_max)
            prev_max, curr_max = curr_max, max(curr_max, prev_max + amount)
        return curr_max

    n = len(nums)
    if n == 0:
        return 0
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])

    # Case 1: Exclude last house
    case1 = rob_linear(nums[:-1])
    # Case 2: Exclude first house
    case2 = rob_linear(nums[1:])

    return max(case1, case2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - We run a single O(n) dynamic programming pass for each scenario (excluding last, and excluding first), so overall time is O(n).
- **Space Complexity:** O(1)
  - Only a few variables are used; no extra arrays proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this algorithm if no more than k adjacent houses can be robbed?  
  *Hint: Try generalizing the DP state for different adjacent house skips.*

- What modifications are needed if each house has a "cooldown" period after being robbed?  
  *Hint: Extend your DP state to track extra cooldown period.*

- How would you handle the problem if houses are connected in a tree, not a circle?  
  *Hint: Consider DP on a tree (post-order traversal with include/exclude states).*

### Summary  
This problem uses **dynamic programming with state reduction** and is a variant of the classic House Robber pattern. The twist—houses arranged in a circle—forces us to split the problem into two linear subproblems, avoiding the circular adjacency. This **sliding-window DP** or **rolling state DP** technique (with O(1) extra space) is common for problems where decisions depend on non-adjacent or "skip-and-take" patterns, such as in maximum subsequence sums without consecutive picks.


### Flashcard
Since houses are in a circle, solve two cases: rob 0 to n-2 or 1 to n-1, then return the max of the two linear DP results.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- House Robber(house-robber) (Medium)
- Paint House(paint-house) (Medium)
- Paint Fence(paint-fence) (Medium)
- House Robber III(house-robber-iii) (Medium)
- Non-negative Integers without Consecutive Ones(non-negative-integers-without-consecutive-ones) (Hard)
- Coin Path(coin-path) (Hard)