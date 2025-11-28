### Leetcode 3216 (Easy): Lexicographically Smallest String After a Swap [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap)

### Description  
Given a string `s` containing only digits, you are allowed to swap **at most one** pair of adjacent digits **with the same parity** (both odd or both even). The goal is to return the **lexicographically smallest** string possible after such a swap. If no swap is possible or needed, return the original string.

- Digits have the same parity if both are even (0,2,4,6,8) or both are odd (1,3,5,7,9).
- Only one swap between any adjacent pair is allowed.

### Examples  

**Example 1:**  
Input: `s = "2471"`  
Output: `s = "4271"`  
*Explanation: The first adjacent pair with the same parity is '2' and '4' (indices 0,1), both even. Since '2' < '4', swapping does not help. Next, '4' and '7' are not the same parity. '7' and '1' are both odd, and '7' > '1', so swapping them creates "2417" which is lex smaller than the original. But since we process left-to-right, the first beneficial swap is between '4' and '2', but that's not a valid pair (ordering). The only beneficial swap would be between '7' and '1'. After swap: "2417".*

**Example 2:**  
Input: `s = "132"`  
Output: `s = "123"`  
*Explanation: '3' and '2' are not the same parity, but '1' and '3' are both odd. '1' < '3', so swapping doesn't help. Original is already minimal. No swap needed.*

**Example 3:**  
Input: `s = "4321"`  
Output: `s = "3421"`  
*Explanation: '4' and '3' are not the same parity (even, odd). '3' and '2' are not the same parity. '2' and '1' are not the same parity. No two adjacent digits share same parity, so return the original string.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible adjacent swaps for pairs with same parity, check each resulting string, and return the lexicographically smallest.  
  - Time complexity would be O(n), but can be improved since only one swap is allowed.

- **Optimized approach:**  
  - Go left-to-right through the string.
  - For each index `i`, if s[i] and s[i+1] share parity **and** s[i] > s[i+1], swapping will produce a lexicographically smaller string.
  - Do the swap and **immediately return**; only one swap allowed.
  - If no such pair exists, return the original string.

- **Why this works:**  
  - Lexicographical order prioritizes leftmost digits. First possible beneficial swap yields smallest possible string.  
  - We only need to check each adjacent pair once.

### Corner cases to consider  
- String length is 1 (no swap possible).
- No adjacent digits share same parity.
- All digits already sorted.
- All digits have same parity (so all swaps possible).
- Multiple beneficial swaps exist — should choose the leftmost.
- Swap makes no improvement (i.e., s[i] < s[i+1]).

### Solution

```python
def lexicographically_smallest_string_after_swap(s: str) -> str:
    s_list = list(s)
    n = len(s_list)
    for i in range(n - 1):
        # Check if adjacent digits have the same parity
        if (int(s_list[i]) % 2) == (int(s_list[i + 1]) % 2):
            # If swapping is beneficial, perform swap and return
            if s_list[i] > s_list[i + 1]:
                s_list[i], s_list[i + 1] = s_list[i + 1], s_list[i]
                return ''.join(s_list)
    # If no beneficial swap is found, return original string
    return s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we scan the string once for adjacent pairs.
- **Space Complexity:** O(n), due to the list copy for swapping; otherwise, just O(1) extra for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to perform *multiple* swaps?  
  *Hint: Consider bubble sort-like passes for all adjacent pairs with same parity.*

- What if you can swap *any* two digits (not just adjacent and not just same parity)?  
  *Hint: Greedy approach — try to place minimal digits at each position.*

- How does your solution change for non-digit strings or mixed characters?  
  *Hint: How to handle character comparison and parity checks not based on digits?*

### Summary
This problem uses a **greedy single-pass scan** to look for a beneficial adjacent swap (with parity constraint), a common pattern for problems requiring the first local improvement to guarantee global optimality under one-operation restriction. This approach is similar to early-exit bubble sort — often found in problems with local rearrangement constraints. This technique can be applied whenever the goal is to generate the lexicographically minimal string using one local operation.


### Flashcard
Scan left-to-right; swap s[i] and s[i+1] if they share parity and s[i] > s[i+1], then stop (only one swap allowed).

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Lexicographically Smallest String After Applying Operations(lexicographically-smallest-string-after-applying-operations) (Medium)