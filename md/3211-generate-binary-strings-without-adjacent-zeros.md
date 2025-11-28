### Leetcode 3211 (Medium): Generate Binary Strings Without Adjacent Zeros [Practice](https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros)

### Description  
Given an integer **n**, generate and return all **binary strings of length n** where **no two zeros are adjacent**.  
In other words, every substring of length 2 must contain at least one ‘1’.  
You need to return all valid strings in any order.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `["010", "011", "101", "110", "111"]`  
*Explanation: All of these are length-3 binary strings in which no two 0's are together. For example, "010": both pairs "01" and "10" are valid (contain at least one '1').*

**Example 2:**  
Input: `n = 1`  
Output: `["0", "1"]`  
*Explanation: Strings of length 1 have no pair of bits, so both possibilities are allowed.*

**Example 3:**  
Input: `n = 4`  
Output: `["0101", "0100", "0110", "0111", "1010", "1011", "1100", "1101", "1110", "1111"]`  
*Explanation: "0100" is valid because any two consecutive digits always have at least one '1'. "1000" would be invalid because it has "00".*

### Thought Process (as if you’re the interviewee)  
To begin, I would try a **brute-force** approach by generating all possible binary strings of length n and then filtering out those having consecutive zeros. However, since the number of possible strings grows exponentially (2ⁿ), it's better to avoid generating invalid strings in the first place.

A **backtracking/DFS** approach works well.  
- Start building the string position-by-position.
- At each step:
  - If the previous bit is '0', I cannot place another '0' (to avoid consecutive zeros).
  - Otherwise, both '0' and '1' are acceptable for the next bit.
- Whenever a string of length n is completed, add it to the output list.

This systematically generates only valid binary strings and skips all invalid branches early, improving efficiency.

### Corner cases to consider  
- n = 1  
- n = 2  
- All 1’s (“111…1”) is always valid  
- Should handle large n (up to 18) efficiently  
- Edge: make sure you don’t generate something like “00”

### Solution

```python
def generateBinaryStrings(n):
    res = []
    def backtrack(pos, curr, prev):
        # Base case: completed length-n string
        if pos == n:
            res.append(''.join(curr))
            return
        # If previous character is '1', both '0' and '1' are possible
        if prev == '1':
            # add '0'
            curr.append('0')
            backtrack(pos+1, curr, '0')
            curr.pop()
            # add '1'
            curr.append('1')
            backtrack(pos+1, curr, '1')
            curr.pop()
        else:
            # Previous is '0', only '1' is allowed to avoid adjacent zeros
            curr.append('1')
            backtrack(pos+1, curr, '1')
            curr.pop()
    # Initial call: prev='' as the empty char allows both '0' and '1' as start
    backtrack(0, [], '1')  # start with '1'
    backtrack(0, [], '0')  # start with '0'
    # Remove duplicate if n == 1, as both entries call backtrack(0, ..., ...)
    if n == 1:
        return ['0', '1']
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ) in the worst case, since each bit can be independently '0' or '1', though recursion cuts off invalid branches early.
- **Space Complexity:** O(n × 2ⁿ), as we store up to 2ⁿ strings, each of length n, plus recursion stack at most O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate all such strings in lexicographical order?  
  *Hint: Sort the result at the end or modify the recursion to process '0' before '1' or vice versa.*

- What if you want to **count** the number of such strings for a given n, not generate them?  
  *Hint: DP recurrence: f(n) = f(n-1) + f(n-2), Fibonacci-like.*

- Can you further reduce space if only outputting via iterator rather than collecting all?  
  *Hint: Yield strings using generator instead of storing in a list.*

### Summary
This problem uses the classic **backtracking** (DFS) technique with pruning, exploiting the adjacency constraint to avoid generating invalid branches.  
This pattern is common for generating or counting strings under substring constraints and appears in problems related to **Fibonacci** recurrences, **bitmask DP**, or **enumeration with local rules**.


### Flashcard
Use backtracking/DFS; at each position, append '1' always, but append '0' only if previous bit wasn't '0'.

### Tags
String(#string), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Non-negative Integers without Consecutive Ones(non-negative-integers-without-consecutive-ones) (Hard)