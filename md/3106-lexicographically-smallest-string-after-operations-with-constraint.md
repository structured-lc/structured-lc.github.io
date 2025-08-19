### Leetcode 3106 (Medium): Lexicographically Smallest String After Operations With Constraint [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint)

### Description  
You are given a string **s** and an integer **k**. You can change any character in **s** to any lowercase English letter, but each change comes with a *distance* cost, defined as the minimum number of steps to get from the current character to your target character in the alphabet (letters wrap around, so 'a' <-> 'z' is a distance of 1). You want to form a string **t** such that the total sum of distances for all character changes from **s** to **t** is at most **k**. Out of all such possible strings, return the lexicographically smallest one.

---

### Examples  

**Example 1:**  
Input: `s = "zbbz", k = 3`  
Output: `"aabz"`  
*Explanation: Change 'z' (pos 0) to 'a' (cost 1). Change 'b' (pos 1) to 'a' (cost 1). Change 'b' (pos 2) to 'a' (cost 1). Cost used: 3. Can't change the last 'z' anymore. "aabz" is the smallest possible with k=3.*

**Example 2:**  
Input: `s = "az", k = 1`  
Output: `"aa"`  
*Explanation: Changing 'z' (pos 1) to 'a' costs 1 (since they wrap around). Can't change 'a' any further. Result: "aa".*

**Example 3:**  
Input: `s = "bab", k = 2`  
Output: `"aab"`  
*Explanation: Change 'b' (pos 0) to 'a' (cost 1). Change 'a' (pos 1) to 'a' (cost 0). Change 'b' (pos 2) to 'b' (cost 0 - can't afford more).*

---

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** Try all ch combinations for t and check if distance(s, t) ≤ k, then track the lex smallest. This is not feasible; too many combinations (26ⁿ).
- **Can we greedily build the answer?** Since "lexicographically smallest" means we want the leftmost (earlier) characters to be as small as possible, ideally 'a' in each spot.
- For each position, try to set the current character as close to 'a' as k allows:
    - Compute the *distance* to change sᵢ to 'a' using min((ord(s[i]) - ord('a')) % 26, (ord('a') - ord(s[i])) % 26).
    - If you can transform to 'a' within remaining k, do it, reduce k, and move forward.
    - If not, try the smallest next character possible within available k.
    - Proceed left-to-right to greedily prioritize lex smallest.
- This works since making leftmost chars small gives smaller lex order, and the distance constraint is always maintained.

---

### Corner cases to consider  
- s is already all 'a's, k = 0.
- k = 0, i.e., no changes allowed.
- k is very large (can turn all to 'a').
- Distance from one letter to another wraps around (e.g., 'z' to 'a' is cost 1).
- s is length 1.
- Need to change middle character(s) but not enough k for all.

---

### Solution

```python
def lexicographically_smallest_string(s: str, k: int) -> str:
    n = len(s)
    res = list(s)
    for i in range(n):
        cur = ord(res[i]) - ord('a')
        # Cost to make res[i] => 'a' in minimum steps (in cyclic alphabet)
        cost_to_a = min(cur, 26 - cur)
        if cost_to_a <= k:
            k -= cost_to_a
            res[i] = 'a'
        else:
            # Can't set to 'a', adjust to smallest possible char within k
            move = k
            new_char_val = (cur - move) % 26
            res[i] = chr(ord('a') + new_char_val)
            k = 0  # all used up
            break  # No more changes possible
    # Leave rest as is
    return ''.join(res)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single left-to-right pass, constant work per character.
- **Space Complexity:** O(n) — O(n) for result string (since string is immutable, build as list and join at end).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet wasn't size 26 but arbitrary, or the wrap-around behavior changed?  
  *Hint: How would the distance function adapt to a general alphabet or numeric sequence?*

- How would you solve the problem if changes to each position had a different cost table?  
  *Hint: Can you preprocess the minimum cost for each spot and use dynamic programming?*

- Suppose you want to maximize the resultant string lexicographically (largest, not smallest) under the same constraint.  
  *Hint: What change would you make to your greedy order/logic?*

---

### Summary
This problem uses a **greedy** pattern: at each position, reduce the earliest character as much as possible within remaining k to ensure the smallest lex order. The cyclic alphabet and minimum step distance are key twists, but the solution remains linear. The general pattern applies to "lex smallest under cost constraint" questions, useful in greedy algorithm practice and contest problems.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Lexicographically Smallest String After Substring Operation(lexicographically-smallest-string-after-substring-operation) (Medium)