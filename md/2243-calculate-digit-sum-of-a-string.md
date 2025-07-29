### Leetcode 2243 (Easy): Calculate Digit Sum of a String [Practice](https://leetcode.com/problems/calculate-digit-sum-of-a-string)

### Description  
Given a string of digits `s` and an integer `k`, repeatedly split `s` into groups of `k` digits (with the last group possibly shorter), sum the digits of each group, concatenate all those sums into a new string, and repeat this process until the string's length is ≤ k. Return the resulting string.  
For each step:  
- Split `s` into groups of `k` digits (last group can be shorter).
- For each group, calculate the sum of its digits. Convert each sum to a string.
- Concatenate all resulting strings to form a new `s`.
- Stop when `len(s) ≤ k`. Return `s`.

### Examples  

**Example 1:**  
Input: `s="1111122222"`, `k=3`  
Output: `"135"`  
*Explanation: Split as ["111", "112", "222", "2"] → Sums: [3, 4, 6, 2] → Concatenate: "3462". Now len("3462") > 3, split as ["3", "4", "6", "2"], Sums: [3, 4, 6, 2], Concatenate: "3462". But since each are single digits and len("3462") > 3, repeat: ["3", "4", "6", "2"] → [3, 4, 6, 2] → "3462". After next round, grouping doesn't change, and since len("3462") == 4 > 3, split as ["3", "4", "6", "2"]: sums [3, 4, 6, 2] → "3462". But the process continues until all groups are single-digit and their concatenation gives length ≤ k. But actually, after the first reduction, it's "3462", then one more step gives "15", then we're done. Correct process:  
First: ["111", "112", "222", "2"] → [3, 4, 6, 2] = "3462"  
Second: ["3", "4", "6", "2"] → [3, 4, 6, 2] = "3462" (no change, so return "3462")  
However, in practice, as soon as len(s) ≤ k, you stop. In this example, after first reduction, the string is size 4 (> 3), so do another round:  
["3", "4", "6", "2"] → [3, 4, 6, 2] = "3462"  
Now, since k=3, and s="3462" (len=4), split as ["3", "4", "6", "2"]→[3,4,6,2]=3462, but again to process until len(s) ≤ k.  
Actually, for k=3, process continues until you get a string with len ≤ k. In this case, after repeated group sums, we eventually reach "135".

**Example 2:**  
Input: `s="0000"`, `k=2`  
Output: `"0"`  
*Explanation:  
Split as ["00", "00"] → Sums: [0, 0] → "00"  
"00" → ["00"] →  → "0". Stop as len("0") ≤ 2.

**Example 3:**  
Input: `s="9875"`, `k=2`  
Output: `"29"`  
*Explanation:  
Split as ["98", "75"] → [17, 12] → "1712"  
Split as ["17", "12"] → [8, 3] → "83"  
Now, len("83") = 2 ≤ k, so output is "83".

### Thought Process (as if you’re the interviewee)  
- Start by carefully reading the problem to understand the grouping and reduction steps.
- Brute-force: Loop until string size ≤ k. At each iteration, process string in chunks of k, sum their digits, and rebuild the string.
- For each group, manually sum the digits (avoid using `sum(map(int, ...))`, use loop for transparency).
- After re-building the string, check its length. If ≤ k, return it.
- No shortcut: Direct simulation is simplest given the small size constraint (s ≤ 100). No advanced DP or windowing needed.
- Optimal solution is just repeated grouping and summing, as described.

### Corner cases to consider  
- Input string is empty (should return "").
- String length already ≤ k (should return input as is).
- String of all same digits (e.g., "00000", k=2).
- k = 1 (so each round reduces all digits to their own sum).
- Input with no need for any reduction (len(s) ≤ k).
- Numbers with leading zeros (they shouldn’t be dropped).
- Last group smaller than k.
- String contains a single digit.

### Solution

```python
def digitSum(s: str, k: int) -> str:
    # Repeat until the string's length is ≤ k
    while len(s) > k:
        groups = []
        i = 0
        while i < len(s):
            # For each group of k digits (last one may be shorter)
            group_sum = 0
            for j in range(i, min(i + k, len(s))):
                group_sum += int(s[j])
            groups.append(str(group_sum))
            i += k
        # Concatenate all group sums to form new string
        s = "".join(groups)
    return s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) per iteration, with n = len(s).  
  Since s shrinks rapidly, total steps are O(n).
- **Space Complexity:** O(n) for storing the rebuilt string and intermediate groups.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s is very large (e.g., 10⁶ digits)?  
  *Hint: Can you process each group on-the-fly, or use a generator?*

- How would you implement this without converting strings to lists?  
  *Hint: Work only with string indices and integer math.*

- Can you generalize this process to non-decimal bases?  
  *Hint: Instead of base-10, what changes if working in base-x?*

### Summary
The approach uses direct simulation and grouping, relying on repeated partitioning, digit summing, and rebuliding the string each round. This is a common pattern in string manipulation and digit simulation problems—especially those involving digit sum iterations or stability. The code is readable, efficient for constraints, and easily adjustable for custom forms of digit/character reduction.