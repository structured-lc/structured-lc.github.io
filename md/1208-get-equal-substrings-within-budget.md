### Leetcode 1208 (Medium): Get Equal Substrings Within Budget [Practice](https://leetcode.com/problems/get-equal-substrings-within-budget)

### Description  
Given two equal-length strings **s** and **t**, and an integer **maxCost**, return the length of the longest substring in **s** that can be changed into the corresponding substring in **t** without exceeding the given **maxCost**.  
Changing the iᵗʰ character of **s** to **t** costs |ord(s[i]) - ord(t[i])|.  
You may choose any substring, but the total cost to convert must be ≤ maxCost.

### Examples  

**Example 1:**  
Input: `s = "abcd", t = "bcdf", maxCost = 3`  
Output: `3`  
*Explanation: The costs to change: [1, 1, 1, 1]. The substring "abc" → "bcd" costs 1 + 1 + 1 = 3, which is within maxCost. Length is 3.*

**Example 2:**  
Input: `s = "abcd", t = "cdef", maxCost = 3`  
Output: `1`  
*Explanation: The costs to change: [2, 2, 2, 2]. Each character costs 2 to convert, so only a single character can be changed within the budget. Length is 1.*

**Example 3:**  
Input: `s = "abcd", t = "acde", maxCost = 0`  
Output: `1`  
*Explanation: The costs to change: [0, 2, 1, 1]. Only substrings where s[i] == t[i] cost zero, which only happens at s.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible substrings, calculate cost for each. Time O(n²), which is inefficient for large n.
- **Optimization:**  
  - Notice costs only add up over continuous substrings.
  - Maintain a window [left, right]. As we expand right, keep a running sum of costs.
  - If the sum exceeds maxCost, move left pointer rightwards to reduce total cost.
  - This is the **sliding window technique**.
- **Why sliding window:**  
  - Only need local knowledge to expand/contract the window.
  - Each index is visited at most twice.
  - Efficient O(n) solution.

### Corner cases to consider  
- Empty strings: Output should be 0.
- maxCost = 0: Only matching characters allowed.
- s and t are already equal: Full string is answer.
- Maximum cost per character > maxCost: Only substrings of length 0 or 1.
- maxCost large enough to convert whole string.

### Solution

```python
def equalSubstring(s: str, t: str, maxCost: int) -> int:
    left = 0
    current_cost = 0
    max_length = 0

    for right in range(len(s)):
        # Add the current conversion cost to the window
        current_cost += abs(ord(s[right]) - ord(t[right]))

        # Shrink window from the left if cost exceeds maxCost
        while current_cost > maxCost:
            current_cost -= abs(ord(s[left]) - ord(t[left]))
            left += 1

        # Update the maximum window size found so far
        max_length = max(max_length, right - left + 1)

    return max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Each pointer (left/right) only moves forward; inner loop at most n times.
- **Space Complexity:** O(1) extra space. Only variables and no additional storage relative to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to output the substring itself, not just its length?  
  *Hint: Track indices when you update max_length.*

- Can you solve the problem if s and t are not guaranteed to be the same length?  
  *Hint: Modify the algorithm for unequal lengths, or handle only up to the minimum length.*

- How would you handle Unicode characters (beyond ASCII)?  
  *Hint: ord() works for all Unicode, so the algorithm is already general.*

### Summary
This problem is a classic **sliding window** pattern for substrings with resource/constraint limits. It’s efficient (O(n)), easy to implement, and widely applicable to “longest/shortest subarray with constraints” problems (prime example: longest subarray with sum ≤ k, etc.). This window expansion/contraction method avoids brute force checking all substrings.

### Tags
String(#string), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Longest Nice Subarray(longest-nice-subarray) (Medium)