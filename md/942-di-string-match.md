### Leetcode 942 (Easy): DI String Match [Practice](https://leetcode.com/problems/di-string-match)

### Description  
You are given a string **s** of length n consisting only of characters 'I' (for increase) and 'D' (for decrease).  
You need to construct a permutation of the numbers from 0 to n (inclusive, so n+1 numbers), such that:
- for every i (0 ≤ i < n):
  - if s[i] == 'I', then perm[i] < perm[i+1]
  - if s[i] == 'D', then perm[i] > perm[i+1]
Return any valid permutation.  
For instance, given `'IDID'`, you want to create an array of size 5 using numbers 0,1,2,3,4, so that each 'I' makes an increasing step and each 'D' a decreasing step.

### Examples  

**Example 1:**  
Input: `s = "IDID"`  
Output: `[0,4,1,3,2]`  
*Explanation: Start with the smallest for 'I' (`0`), the largest for next 'D' (`4`), then next smallest for 'I' (`1`), next largest for 'D' (`3`), and finally whatever is left (`2`).*

**Example 2:**  
Input: `s = "III"`  
Output: `[0,1,2,3]`  
*Explanation: Always increase, so a strictly increasing sequence: 0,1,2,3.*

**Example 3:**  
Input: `s = "DDI"`  
Output: `[3,2,0,1]`  
*Explanation: Start with largest (`3`), then next largest (`2`), then the smallest left (`0`), finally whatever is left (`1`).*

### Thought Process (as if you’re the interviewee)  
My first thought is to simulate the construction from left to right. Since every position must be strictly increasing or decreasing as dictated, I need to carefully pick the numbers.  
Brute-force would try all permutations, but that's infeasible for n up to thousands.

A greedy strategy works:  
- Keep two pointers: **low** starting at 0 and **high** at n.
- For each character in the string:
  - If it's 'I', use **low** as the next number and increment **low**.
  - If it's 'D', use **high** as the next number and decrement **high**.
- After exiting the loop, only one number is left (since n+1 total slots). Add this number at the end.

This approach guarantees that the adjacent pairs satisfy the increase or decrease property, as the only available remaining numbers slot in exactly at the final position.

### Corner cases to consider  
- Input is all 'I's: Should return a strictly increasing sequence [0,1,...,n].
- Input is all 'D's: Should return strictly decreasing [n, n-1, ...,0].
- Empty string: Output should be  (only one number, 0).
- Alternating 'I' and 'D'.
- Very long string to check efficiency.

### Solution

```python
def diStringMatch(s: str) -> list[int]:
    # Initialize the output array and the two pointers
    n = len(s)
    low, high = 0, n
    result = []
    # Traverse the string and assign values using greedy logic
    for char in s:
        if char == 'I':
            result.append(low)
            low += 1
        else:  # char == 'D'
            result.append(high)
            high -= 1
    # Last remaining number (low == high at this point)
    result.append(low)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Each character is processed once.
- **Space Complexity:** O(n), for the output array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you needed to return all valid permutations, not just any one of them.  
  *Hint: Can you use backtracking? What would the branching factor look like?*

- What if the string can contain invalid letters or lowercase/uppercase mix?  
  *Hint: Validate and sanitize input or normalize case up-front.*

- Can you do this in-place if an array is provided and mutability is allowed?  
  *Hint: Since each value is assigned in an order, see if you can fill an array without extra storage.*

### Summary
This problem is a classic example of the **two pointers** and **greedy construction** pattern. By always placing the smallest or largest available number depending on the next needed direction, we guarantee correctness in a single pass. This logic can show up in other greedy sequence-construction problems, such as reconstructing orderings from constraints or simulating simple permutations under rules.