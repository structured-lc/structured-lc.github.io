### Leetcode 135 (Hard): Candy [Practice](https://leetcode.com/problems/candy)

### Description  
You are given a list of integers, representing the ratings of \( n \) children standing in a line. You need to distribute candies to these children based on two rules:

- Each child must get **at least one candy**.
- Children with a **higher rating than an immediate neighbor** (either left or right) must get **more candies** than that neighbor.

Return the **minimum** number of candies needed so that all the conditions are satisfied.

### Examples  

**Example 1:**  
Input: `ratings = [1,0,2]`  
Output: `5`  
*Explanation: Give 2 candies to the first child (rating 1), 1 candy to the second (rating 0), and 2 candies to the third (rating 2). Distribution: [2,1,2].*

**Example 2:**  
Input: `ratings = [1,2,2]`  
Output: `4`  
*Explanation: Give 1 candy to the first child (1), 2 to the second child (2 because higher than left neighbor), and 1 to the third (equal to previous rating). Distribution: [1,2,1].*

**Example 3:**  
Input: `ratings = [1,3,4,5,2]`  
Output: `11`  
*Explanation: Distribution is [1,2,3,4,1]. Increase candies going up, reset when descending.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible distributions that satisfy the constraints and pick the one with the minimum candies.  
  This is clearly exponential and infeasible for larger inputs.

- **Greedy, Two-pass approach:**  
  - Give **1 candy to each child** to start.
  - **Left-to-right pass:** If rating[i] > rating[i-1], then candies[i] = candies[i-1] + 1.
  - **Right-to-left pass:** If rating[i] > rating[i+1], then candies[i] = max(candies[i], candies[i+1] + 1).
  - Sum all candies at the end for result.
  - This approach is effective because local minima get 1 candy, and increases in rating are reflected from both the left and right.

- **Why this approach?**  
  It’s linear time, intuitive, and handles both left and right neighbor checks efficiently.  
  Any attempt at a single-pass solution fails for sequences that first increase then decrease since you need both neighbor contexts.

### Corner cases to consider  
- Empty `ratings` list (return 0).
- Only one child.
- All ratings the same (everyone just gets 1).
- Strictly increasing or strictly decreasing ratings.
- Plateaus: equal ratings in a row.
- Zig-zag patterns in ratings (up, down, up, down).

### Solution

```python
def candy(ratings):
    n = len(ratings)
    if n == 0:
        return 0

    # 1. Start with 1 candy for each child
    candies = [1] * n

    # 2. Left-to-right: ensure right child gets more if rating is higher
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    # 3. Right-to-left: ensure left child gets more if rating is higher
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    
    # 4. Sum up all candies
    return sum(candies)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each pass (left-to-right, right-to-left) takes O(n), and summing is O(n).
  - Total is O(n).
- **Space Complexity:** O(n)
  - The candies array stores the count for each child.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this with **O(1) space**?
  *Hint: Is it possible to reuse the input or process with only a couple of variables?*

- How would you output **the actual distribution** of candies, not just the sum?
  *Hint: Return the candies array instead of just sum.*

- What if **children form a circle** (neighbors at both ends)?
  *Hint: Try to generalize by handling wrap-around logic.*

### Summary
This problem is a classic **greedy/array manipulation** problem.  
The two-pass scan (left-to-right, then right-to-left) is a common pattern for enforcing local ordering constraints when each element depends on both neighbors.  
Patterns like this apply to problems involving hills/valleys, stock buy/sell with two positions, or similar “enforce min/max in both directions” tasks.


### Flashcard
Do two passes: left-to-right and right-to-left, updating candies based on neighbor ratings; sum final candies for minimum distribution.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Minimize Maximum Value in a Grid(minimize-maximum-value-in-a-grid) (Hard)
- Minimum Number of Operations to Satisfy Conditions(minimum-number-of-operations-to-satisfy-conditions) (Medium)
- Check if Grid Satisfies Conditions(check-if-grid-satisfies-conditions) (Easy)