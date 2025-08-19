### Leetcode 1176 (Easy): Diet Plan Performance [Practice](https://leetcode.com/problems/diet-plan-performance)

### Description  
You are given an array where calories[i] represents the calories consumed on the iᵗʰ day. Given integers k, lower, and upper, you need to evaluate the person's *diet performance* as follows:  
- For every sequence of k consecutive days, calculate the total calories consumed.
- If the total is less than lower, subtract 1 point from their performance.
- If the total is greater than upper, add 1 point.
- If the total is within [lower, upper] (inclusive), do nothing.

Return the final performance score after considering all k-length windows throughout the days.

### Examples  

**Example 1:**  
Input: `calories = [1, 2, 3, 4, 5], k = 1, lower = 3, upper = 3`  
Output: `0`  
*Explanation: The sum for each window is [1], [2], [3], [4], [5]. Only 3 is within [3, 3], the other windows are below or above, but their increments (+1, -1) cancel each other out, leaving the total at 0.*

**Example 2:**  
Input: `calories = [3, 2], k = 2, lower = 0, upper = 1`  
Output: `1`  
*Explanation: The only window sum is 3 + 2 = 5, which is greater than upper (1), so +1 point.*

**Example 3:**  
Input: `calories = [6, 5, 0, 0], k = 2, lower = 1, upper = 5`  
Output: `0`  
*Explanation: The window sums are [11, 5, 0].  
  - 11 > 5 ⇒ +1  
  - 5 ∈ [1, 5] ⇒ 0  
  - 0 < 1 ⇒ -1  
  Final score: 1 + 0 - 1 = 0*


### Thought Process (as if you’re the interviewee)  
First, I would try a brute-force approach: for every possible window of k days, calculate the sum, compare it against lower and upper, and adjust the score. However, for each window this involves summing k elements, costing O(k) per window; overall, this leads to O(nk) time, which is inefficient for large n.

To optimize, I'd use a **sliding window**. Start by computing the sum of the first k days. Then as I move the window forward by one day, subtract the outgoing element and add the incoming one, adjusting the sum in O(1) per shift. For each new sum, check against lower/upper and adjust the score accordingly. This brings the overall time down to O(n).

### Corner cases to consider  
- Empty calories array → Output should be 0.
- k > len(calories): No window possible; no score should be adjusted.
- lower > upper: The range for no-op is empty.
- k == 1: Every day is a single window; should work as expected.
- All calorie values are identical.
- lower = upper: Only exact sums in that window range remain neutral.

### Solution

```python
def dietPlanPerformance(calories, k, lower, upper):
    n = len(calories)
    score = 0
    
    # Calculate the sum of the first k-day window
    window_sum = sum(calories[:k])
    
    # Helper function to get point adjustment
    def check(s):
        if s < lower:
            return -1
        elif s > upper:
            return 1
        return 0

    # Evaluate the first window
    score += check(window_sum)
    
    # Slide the window through the array
    for i in range(k, n):
        # Remove the caloric intake that's fallen out of the window
        window_sum -= calories[i - k]
        # Add the new day's caloric intake
        window_sum += calories[i]
        score += check(window_sum)
    
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each arrival or departure from the window is processed in O(1), looping through the array once.
- **Space Complexity:** O(1) — Only a few variables for scores and the running sum; no extra data structures that scale with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiple queries for different values of k are given on the same calories array?  
  *Hint: Consider using prefix sums for efficient window sums across multiple k.*

- How would you handle massive input where calories doesn't fit in memory?  
  *Hint: Streaming/online algorithms, maybe keeping only a window in memory.*

- Can you return the score for each window instead of just the total?  
  *Hint: Collect the results for each window and return as a list.*

### Summary
This problem is a classic example of the **sliding window** pattern—efficient for situations where you need to maintain information over contiguous subarrays of fixed size. Recognizing when to use this pattern is vital for many array and sequence problems, such as maximum/minimum sum subarrays, averages, or running statistics over time-series data.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
