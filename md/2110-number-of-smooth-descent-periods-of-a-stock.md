### Leetcode 2110 (Medium): Number of Smooth Descent Periods of a Stock [Practice](https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock)

### Description  
Given an array `prices` where `prices[i]` is the price of a stock on the iᵗʰ day, a **smooth descent period** is a contiguous subarray of one or more days where, for every day after the first in the subarray, the price is exactly `1` less than the previous day's price. A single day is always a valid smooth descent period.  
Your task: **Count all possible smooth descent periods in the given prices array.**

### Examples  

**Example 1:**  
Input: `prices = [3,2,1,4]`  
Output: `7`  
Explanation:  
There are 7 smooth descent periods: [3], [2], [1], [4], [3,2], [2,1], and [3,2,1].

**Example 2:**  
Input: `prices = [8,6,7,7]`  
Output: `4`  
Explanation:  
There are 4 smooth descent periods: , , , .  
(Note: [8,6] is not valid since 8-6 ≠ 1.)

**Example 3:**  
Input: `prices = [1]`  
Output: `1`  
Explanation:  
There is 1 smooth descent period: [1].

### Thought Process (as if you’re the interviewee)  
A brute force approach would check all possible subarrays and, for each, verify if they form a smooth descent period — this would be O(n²) and not efficient for large n.

A better approach:  
- Observe that each maximal "smooth descent run" (consecutive prices decreasing by 1) can be counted directly.
- For a run of length `cnt`, the number of valid smooth descent periods it contains is cnt × (cnt + 1) / 2, since every subarray within the run is valid and every element itself is also valid.
- We scan prices with two pointers: find runs where prices[j-1]-prices[j]=1, compute length, and sum up their counts using the formula.

This reduces the problem to a single O(n) pass.


### Corner cases to consider  
- prices of length 1 (trivial, single day)
- all prices are equal (all individual days only)
- all strictly descending by 1 (maximum possible answer)
- random increases and decreases (breaks between runs)
- very large inputs (n close to 10⁵)

### Solution

```python
def getDescentPeriods(prices):
    n = len(prices)
    total = 0
    i = 0
    
    while i < n:
        j = i + 1
        # expand j while each new price keeps decreasing by exactly 1 from previous
        while j < n and prices[j-1] - prices[j] == 1:
            j += 1
        run_length = j - i
        # number of continuous smooth descent periods in this run is run_length × (run_length + 1) // 2
        total += (run_length * (run_length + 1)) // 2
        i = j  # move to next block
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan each position only once.
- **Space Complexity:** O(1), only constant extra variables used, no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your code if a smooth descent period could have a decrease of either 0 or 1 each day?  
  *Hint: What adjustment would you make to the conditions in your loop?*

- How can you output all the start and end indices of every smooth descent period, instead of just the count?  
  *Hint: Track all valid (start, end) subarrays in each run.*

- What changes if the problem requires strictly decreasing by at least 1, not exactly 1?  
  *Hint: Update comparison from ==1 to >=1 for descent.*

### Summary
This is a classic *counting runs* or *sliding window* pattern, where you aggregate results for maximal runs instead of individual elements or brute force subarrays. The idea generalizes to many other subarray or substring counting problems involving monotonicity or difference constraints.


### Flashcard
For each maximal smooth descent run, count subarrays as cnt × (cnt+1)/2 and sum over all runs.

### Tags
Array(#array), Math(#math), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Subarray Product Less Than K(subarray-product-less-than-k) (Medium)
- Number of Valid Subarrays(number-of-valid-subarrays) (Hard)
- Number of Zero-Filled Subarrays(number-of-zero-filled-subarrays) (Medium)