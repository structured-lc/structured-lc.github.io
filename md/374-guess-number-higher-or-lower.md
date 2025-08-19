### Leetcode 374 (Easy): Guess Number Higher or Lower [Practice](https://leetcode.com/problems/guess-number-higher-or-lower)

### Description  
Given an integer **n**, you need to guess a secret number picked from *1* to *n* (inclusive). You have access to a helper function `guess(num)`, which returns:
- `0` if your guess (`num`) is correct.
- `-1` if the secret number is lower than your guess.
- `1` if the secret number is higher than your guess.

Your task is to find the secret number using as few guesses as possible.

### Examples  

**Example 1:**  
Input: `n = 10, secret = 6`  
Output: `6`  
*Explanation:  
Possible sequence:  
- Guess 5 → guess(5) returns 1 (secret is higher)  
- Guess 7 → guess(7) returns -1 (secret is lower)  
- Guess 6 → guess(6) returns 0 (correct!)*

**Example 2:**  
Input: `n = 1, secret = 1`  
Output: `1`  
*Explanation:  
Only one number to guess, so guess(1) returns 0 immediately.*

**Example 3:**  
Input: `n = 2, secret = 2`  
Output: `2`  
*Explanation:  
Guess 1 → guess(1) returns 1 (secret is higher)  
Guess 2 → guess(2) returns 0 (correct!)*

### Thought Process (as if you’re the interviewee)  

The brute-force solution is to sequentially guess every number from 1 to n until the secret is found. This approach has a time complexity of O(n), which is inefficient for large n.

Since the `guess` API gives feedback ("higher" or "lower"), we can use **binary search**—a classic algorithm for search in a sorted range. With binary search:
- Repeatedly guess the middle value between the current low and high bounds.
- Update the search space based on the result (`-1` for lower, `1` for higher).
- This reduces the effective search space by half each time, leading to O(log n) guesses.

Binary search is optimal here because the number space is sorted and feedback is directional.

### Corner cases to consider  
- The secret is **1** (lowest possible).
- The secret is **n** (highest possible).
- Only one possible number (n = 1).
- Secret is right at the midpoint several times.
- Very large n (to ensure no integer overflow in mid calculation: use mid = left + (right - left) // 2).

### Solution

```python
# The guess API is already defined for the problem.
# def guess(num: int) -> int:

def guessNumber(n: int) -> int:
    left, right = 1, n
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoids overflow for large n
        res = guess(mid)
        if res == 0:
            return mid  # Found the secret number
        elif res < 0:   # Guess is too high
            right = mid - 1
        else:           # Guess is too low
            left = mid + 1
    # If not found (should not occur), return -1 as a safety net
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** **O(log n)**, since each guess halves the search space.
- **Space Complexity:** **O(1)**, as only a few integer variables are used, and no extra data structures or recursion stack are required.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the guess API was slow or costly?
  *Hint: Discuss memoization or minimizing calls.*

- How would you handle an unbounded search space?
  *Hint: Consider exponential search before binary search.*

- Can you apply this to a rotated or unsorted array?
  *Hint: The binary search principle applies to any ordered search space, so preprocessing or other approaches may be needed.*

### Summary
This approach uses the classic **binary search pattern**, which is highly efficient for sorted data or 'number range' search problems. It's a fundamental pattern also applicable in problems like finding square roots, searching in rotated arrays, or solving root-related math equations. The challenge demonstrates how leveraging problem feedback can lead to drastic improvements over brute-force methods in both time and efficiency.

### Tags
Binary Search(#binary-search), Interactive(#interactive)

### Similar Problems
- First Bad Version(first-bad-version) (Easy)
- Guess Number Higher or Lower II(guess-number-higher-or-lower-ii) (Medium)
- Find K Closest Elements(find-k-closest-elements) (Medium)