### Leetcode 1963 (Medium): Minimum Number of Swaps to Make the String Balanced [Practice](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced)

### Description  
Given a string `s` of even length with exactly half `'['` and half `']'`, you may swap any two brackets any number of times. A string is balanced if every opening bracket has a matching closing bracket in correct order. Return the **minimum number of swaps required to make the string balanced**.

### Examples  

**Example 1:**  
Input: `"][][ "`  
Output: `1`  
*Explanation: The first and last characters need to be swapped: `[[]]`.*

**Example 2:**  
Input: `"]]][[["`  
Output: `2`  
*Explanation:  
- Initial: `"]]][[["`  
- After 1st swap: swap index 1 and 4 ⇒ `"]][[[]"`  
- After 2nd swap: swap index 2 and 5 ⇒ `"][]][["`  
- Now all brackets are matched: `"[[]]"`.*

**Example 3:**  
Input: `"[]"`  
Output: `0`  
*Explanation: The string is already balanced. No swaps are needed.*

### Thought Process (as if you’re the interviewee)  

The brute-force way would be to simulate all possible swaps, but that's infeasible for large inputs. Analyzing the problem, a string is unbalanced when we ever see more ‘]’ than ‘[’ as we scan from left to right. The maximum depth of such imbalance tells us how deep we need to go "negative" before seeing enough opens to balance it out.

The **key insight**:  
- For each unmatched ‘]’, track the *maximum* number of unmatched ‘]’ that occurs as you scan.
- Every swap can fix *two* misplaced brackets, so the answer is ⌊(max_unmatched + 1) / 2⌋.

Optimal plan:
- Sweep the string left to right, using a balance counter: `+1` for ‘[’, `-1` for ‘]’.
- Whenever `balance` is negative, count how negative it gets at max.
- Number of required swaps = ⌊(max_negative + 1) / 2⌋.

**Why is this minimal?** Each swap corrects two misorders, so we divide by 2 (rounded up).

### Corner cases to consider  
- Input is already balanced (`"[[]]"`, `"[]"`)
- All opens followed by all closes, eg. `"[[[[]]]]"`  
- No swaps needed  
- Minimum length (`2` characters)
- Alternating brackets eg. `"[][]"`

### Solution

```python
def minSwaps(s: str) -> int:
    # balance tracks current open-close state
    balance = 0
    max_unmatched = 0

    for ch in s:
        if ch == '[':
            balance += 1
        else:  # ch == ']'
            balance -= 1
            # if balance is negative, there's an unmatched ']'
            if balance < 0:
                max_unmatched = max(max_unmatched, -balance)
    
    # (Each swap fixes two extra ']')
    # Number of swaps = ceil(max_unmatched / 2)
    # ceil(x/2) = (x+1) // 2 for positive x
    return (max_unmatched + 1) // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan the string once, keeping track of balance and max_unmatched.
- **Space Complexity:** O(1) — Only a few integers stored regardless of input string size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps are only allowed between adjacent brackets?  
  *Hint: Can you use a queue to track positions and iterate through swaps?*

- Can the problem be extended to strings with an unequal number of brackets?  
  *Hint: What invariant must hold for a string to be balanceable?*

- If cost of a swap is the distance between indices, how to minimize total cost?  
  *Hint: Greedy matching of open/close indices, possibly with heaps.*

### Summary
This problem is a **stack/balancing parentheses variant**, but can be solved with a single-pass and a counter. The core technique—tracking running balance and max imbalance—is commonly useful in similar bracket-matching or stack problems. This method also generalizes to related parenthesis matching problems and is a recurring theme in parsing and string-validation interview questions.

### Tags
Two Pointers(#two-pointers), String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Remove Invalid Parentheses(remove-invalid-parentheses) (Hard)
- Minimum Add to Make Parentheses Valid(minimum-add-to-make-parentheses-valid) (Medium)
- Minimum Remove to Make Valid Parentheses(minimum-remove-to-make-valid-parentheses) (Medium)
- Minimum Insertions to Balance a Parentheses String(minimum-insertions-to-balance-a-parentheses-string) (Medium)