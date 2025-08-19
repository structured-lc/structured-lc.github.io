### Leetcode 1540 (Medium): Can Convert String in K Moves [Practice](https://leetcode.com/problems/can-convert-string-in-k-moves)

### Description  
You are given two strings, **s** and **t**, of the same length, and an integer **k**. You can shift any character in **s** to another character with the following rules:
- In one move, you choose an index and shift `s[i]` forward by **i** positions (where 1 ≤ i ≤ k) in the alphabet (wrapping around after 'z' to 'a').
- Each character in **s** can be shifted at most once (only one move per position).
- Each move must shift by 1 or more positions, but not more than **k**.
- You are allowed at most **k** moves in total, but a position can only be operated on once.
Your task: **Return true if you can convert s into t using at most k moves as described; otherwise, return false.**

### Examples  

**Example 1:**  
Input: `s = "input"`, `t = "jnswy"`, `k = 7`  
Output: `true`  
*Explanation: For each character, calculate the shift needed; all are ≤ k and not repeated.*

**Example 2:**  
Input: `s = "abc"`, `t = "bcd"`, `k = 2`  
Output: `false`  
*Explanation: The shift required for 'a' to 'b', 'b' to 'c', and 'c' to 'd' are all 1 each, but making 3 shifts requires k ≥ 3, so it's not possible with k=2.*

**Example 3:**  
Input: `s = "aab"`, `t = "bbc"`, `k = 27`  
Output: `true`  
*Explanation: Shift 'a' to 'b' with 1 move twice, 'b' to 'c' with 1 move. Since no shift count exceeds k, it's possible.*

### Thought Process (as if you’re the interviewee)  
- First, **check if s and t are the same length**; if not, return false.
- For each index, **calculate the shift distance** needed to convert `s[i]` to `t[i]` (wrapping modulo 26: i.e., ('t' - 's' + 26) % 26).
- Ignore positions where no shift is needed (distance = 0).
- For each unique shift distance, **record how many positions need that shift**. To avoid overlap (since you can only use each move once per shift value), any shift value used more than once must be used at least (count - 1) × 26 + shift times (e.g., for two positions shift=2, second one would need shift+26).
- For each shift, **check if the maximum value needed is ≤ k**.
- If any needed move exceeds k, return false.

### Corner cases to consider  
- s and t are identical (no moves needed).
- s and t differ only by positions with 0 shift required.
- Multiple characters requiring the same shift (overflow due to k limit).
- k is very small (smaller than required shift or number of shifts).
- Max possible shift for a position exceeds k.
- Edge case when wrap around 'z' to 'a' is needed.

### Solution

```python
# O(n) time, O(1) space since max 26 types of shifts

def canConvertString(s: str, t: str, k: int) -> bool:
    if len(s) != len(t):
        return False

    # shift_count[i] = number of times shift of i is needed
    from collections import Counter
    shift_count = Counter()

    for ch1, ch2 in zip(s, t):
        # Calculate shift distance (modulo 26 for wrapping)
        diff = (ord(ch2) - ord(ch1)) % 26
        if diff != 0:
            shift_count[diff] += 1

    # For each unique positive shift, check if maximum required does not exceed k
    for shift, count in shift_count.items():
        # The furthest shift using this value would be shift + 26 * (count - 1)
        max_move = shift + 26 * (count - 1)
        if max_move > k:
            return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s), since we look at each character once.
- **Space Complexity:** O(1), extra storage is at most 26 shift types (constant).

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the alphabet had more or fewer than 26 letters?  
  *Hint: Make shift calculation mod the given alphabet size.*

- What if shifts could go both forward and backward?  
  *Hint: Need to handle negative shifts; consider both directions and pick smaller shift.*

- What if k could be very large (e.g., 10⁹), how would it change your space or approach?  
  *Hint: No change to space, same logic applies, but be careful with overflow in calculation.*

### Summary
This problem is based on counting **minimum shifts required** per character and adjusting for multiple occurrences of the same shift (since each move uses a unique time). The solution follows a **hash map/greedy counting** approach, and knowing how to handle modulo arithmetic for wrapping is key. This pattern is valuable for similar scheduling/resource conflict problems and interval-based transformation challenges.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Minimum Cost to Convert String I(minimum-cost-to-convert-string-i) (Medium)
- Minimum Cost to Convert String II(minimum-cost-to-convert-string-ii) (Hard)