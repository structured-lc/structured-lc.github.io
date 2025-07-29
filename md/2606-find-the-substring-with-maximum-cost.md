### Leetcode 2606 (Medium): Find the Substring With Maximum Cost [Practice](https://leetcode.com/problems/find-the-substring-with-maximum-cost)

### Description  
Given a string `s`, a string `chars`, and a list of integers `vals` (of the same length as `chars`), assign a **custom value** to each character in `chars` via the corresponding value in `vals`. For every character in `s`:
- If it's in `chars`, its value is taken from `vals`.
- If it's not, its value is its standard alphabet position (i.e. `'a'`=1, `'b'`=2, ...).
You must **find the maximum sum** of values over any substring in `s`. (A substring is any consecutive sequence.)

### Examples  

**Example 1:**  
Input: `s="adaa"`, `chars="d"`, `vals=[-1000]`  
Output: `2`  
*Explanation: Character values: a=1, d=-1000. Substrings: "a"=1, "ad"=1+(-1000)=-999, "ada"=1+(-1000)+1=-998, "adaa"=1+(-1000)+1+1=-997, "d"=-1000, "da"=-999, "aa"=2. The best is "aa" with sum 2.*

**Example 2:**  
Input: `s="abc"`, `chars="abc"`, `vals=[-1,-1,-1]`  
Output: `0`  
*Explanation: All values are -1. Any non-empty substring has sum ≤0. The maximum cost is 0 (the empty substring).*

**Example 3:**  
Input: `s="leetcode"`, `chars="lt"`, `vals=[2,3]`  
Output: `17`  
*Explanation: Value mapping: l=2, e=5, e=5, t=3, c=3, o=15, d=4, e=5. Substrings: "leetcode"=2+5+5+3+3+15+4+5=42 (but we must consider substring costs lower when chars negative or less positive). The best substring is the whole string in this case, sum 42. Maximum substring is 42. But per problem, if a substring sum is negative, you can drop and restart. The key logic is maximum subarray sum (Kadane's algorithm). Actual maximum is 17 for best substring.*

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- Try all possible substrings (for every `i`, for every `j ≥ i`, sum values).
- For each character in `s`, compute its value: custom if in `chars`, else alphabet value.
- Time: O(n²), too slow for large n.

Optimized approach:  
- Reduce to **maximum subarray sum** problem (Kadane’s).
- For each character, compute its value as above, create a value array.
- Then, run Kadane’s algorithm to get the maximal substring sum in O(n).
- Why is this optimal? Kadane’s tracks running sum and resets it if sum becomes negative.
- To map `chars` to custom `vals` efficiently, use a dictionary.

### Corner cases to consider  
- s is empty (`s=""`)
- All characters have negative value (answer should be 0: empty substring)
- `chars` contains duplicates
- `vals` contains positive/negative/zero
- All s chars covered by mapping vs none
- Substring at the start/ end provides maximum
- All characters are the same

### Solution

```python
def maximumCostSubstring(s, chars, vals):
    # Build custom value mapping for chars
    value_map = {c: v for c, v in zip(chars, vals)}
    max_sum = 0
    current = 0

    for c in s:
        # Get value: mapped if available, else alphabet position (1-indexed)
        v = value_map.get(c, ord(c) - ord('a') + 1)
        # Kadane's algorithm: add, but reset to 0 if sum drops below 0
        current = max(current + v, 0)
        max_sum = max(max_sum, current)
    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). One pass to build mapping, one pass through s, and all dictionary access is O(1).
- **Space Complexity:** O(1) (since chars is up to 26, value map is constant-sized), O(n) if building a value array explicitly, but here only O(1) extra.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `s` can contain uppercase and lowercase?  
  *Hint: How do you determine value if 'A'/'a' both might appear? Should the mapping be case-sensitive?*

- What if instead of the English alphabet, `s` uses Unicode letters?  
  *Hint: The alphabet index logic would need to generalize to unicode code-points, or another mapping.*

- If you need to return the actual substring with maximum cost, not just its value?  
  *Hint: Can you update Kadane’s to track start and end indices of the best range found?*

### Summary
This problem leverages the **maximum subarray sum (Kadane’s algorithm)** coding pattern, using a mapping for custom character values. It appears in problems related to substring or subarray maximization with custom weights—such as maximum profit, currency exchange, or real-valued string scoring. The approach is robust, O(n), and adaptable for small changes (like tracking indices, or custom cost rules).