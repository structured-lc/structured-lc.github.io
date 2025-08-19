### Leetcode 739 (Medium): Daily Temperatures [Practice](https://leetcode.com/problems/daily-temperatures)

### Description  
You are given an array of integers representing the daily temperatures. For each day, you must determine how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 at that position.

Given `temperatures`, an integer array, return an array `answer` such that `answer[i]` is the number of days after the iᵗʰ day until a warmer temperature. If there is no such day, set `answer[i]` = 0.

### Examples  

**Example 1:**  
Input: `temperatures = [73,74,75,71,69,72,76,73]`  
Output: `[1,1,4,2,1,1,0,0]`  
*Explanation:*
- Day 0 (73): Next warmer is 74 at day 1 ⇒ 1 day  
- Day 1 (74): Next warmer is 75 at day 2 ⇒ 1 day  
- Day 2 (75): Next warmer is 76 at day 6 ⇒ 4 days  
- Day 3 (71): Next warmer is 72 at day 5 ⇒ 2 days  
- Day 4 (69): Next warmer is 72 at day 5 ⇒ 1 day  
- Day 5 (72): Next warmer is 76 at day 6 ⇒ 1 day  
- Day 6 (76): No warmer day ⇒ 0  
- Day 7 (73): No warmer day ⇒ 0  

**Example 2:**  
Input: `temperatures = [30,40,50,60]`  
Output: `[1,1,1,0]`  
*Explanation:*
- Each day is followed by a warmer day immediately, except for the last day.

**Example 3:**  
Input: `temperatures = [30,60,90]`  
Output: `[1,1,0]`  
*Explanation:*
- For day 0, wait 1 day (60)
- For day 1, wait 1 day (90)
- Day 2 is last, so output is 0.

### Thought Process (as if you’re the interviewee)  

Brute-force:
- For each day *i*, scan forward to find the next day *j*` (j > i)` such that `temperatures[j] > temperatures[i]`. Record `j - i` in answer array.
- This is \( O(n^2) \).

Optimized:
- We can speed this up with a **monotonic stack**.
- We use a stack to keep track of the indices of days for which we're still searching for the next warmer temperature.
- As we iterate, if the current day's temperature is higher than the temperature at the index on top of the stack, we keep popping from the stack and set the difference in days at those indices.
- The stack only stores indices of days with unresolved warmer days.
- This is much more efficient and eliminates unnecessary comparisons[1][2][3][4].

### Corner cases to consider  
- Empty array (should return empty array)
- All days have the same temperature
- Temperatures are strictly increasing
- Temperatures are strictly decreasing
- Only one element
- Large input arrays (test efficiency)
- Some temperatures at the end with no warmer days

### Solution

```python
def dailyTemperatures(temperatures):
    n = len(temperatures)
    answer = [0] * n  # Initialize result array with 0
    stack = []  # This will store indices with unresolved next warmer temp

    for i, temp in enumerate(temperatures):
        # While stack is non-empty and current temp > temp at index at stack top
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_index = stack.pop()
            answer[prev_index] = i - prev_index  # Days waited for a warmer temp
        stack.append(i)  # Add current day's index to stack
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each index is pushed and popped at most once ⇒ **O(n)** overall where *n* is the number of days.

- **Space Complexity:**  
  The stack can store up to *n* indices in the worst case (strictly decreasing input) ⇒ **O(n)** for stack + **O(n)** for answer array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to find the next **colder** day instead?
  *Hint: Use similar logic, but compare for less than instead of greater.*

- How would you solve this in **reverse** (right to left traversal)?
  *Hint: Reverse traversal would change how you process and what you store in the stack.*

- Can this approach be generalized to **arbitrary comparisons**, like finding the distance to the next element greater by at least 10?
  *Hint: Modify the comparison logic inside the while loop.*

### Summary
This problem uses the **Monotonic Stack** pattern, which is common when needing to find the "next greater (or smaller)" element to the right (or left) in a sequence. The stack maintains indices in decreasing order of their temperatures, enabling efficiently updating answers as soon as a "warmer" day is found. This pattern is also useful for problems like "Next Greater Element" and "Largest Rectangle in Histogram".

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Next Greater Element I(next-greater-element-i) (Easy)
- Online Stock Span(online-stock-span) (Medium)