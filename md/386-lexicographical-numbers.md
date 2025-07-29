### Leetcode 386 (Medium): Lexicographical Numbers [Practice](https://leetcode.com/problems/lexicographical-numbers)

### Description  
Given a positive integer **n**, return a list of all integers from 1 to n (inclusive) arranged in **lexicographical order**.  
Lexicographical order means that numbers are compared as their string representations, similar to dictionary order. For instance, "10" comes before "2" because '1' precedes '2'[3].

### Examples  

**Example 1:**  
Input: `n = 13`  
Output: `[1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]`  
*Explanation: Numbers from 1 to 13, sorted as strings: "1", "10", "11", "12", "13", "2", "3", ..., "9".*  

**Example 2:**  
Input: `n = 25`  
Output: `[1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 23, 24, 25, 3, 4, 5, 6, 7, 8, 9]`  
*Explanation: If we list all numbers as strings, "10" comes after "1" but before "2", etc.*  

**Example 3:**  
Input: `n = 5`  
Output: `[1, 2, 3, 4, 5]`  
*Explanation: As all numbers are single-digit, their order does not change in lexicographical sorting.*  

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach:

- **Brute Force:**  
  - Generate numbers from 1 to n, convert each to string, and sort them lexicographically.
  - Convert sorted strings back to integers for the result.
  - Time: O(n log n) due to sorting, plus O(n) for string conversion.

But brute-force sorting isn't efficient for larger n (up to 5000).

- **Optimized Approach (DFS):**  
  - Notice lexicographical order is like a prefix tree (trie), where numbers are nodes and children are formed by appending digits 0-9.
  - For each number from 1 to 9, repeatedly multiply by 10 and add digits 0-9 to form valid numbers ≤ n[2].
  - Use either recursion (DFS) or an explicit stack/loop to build the sequence.

This method is efficient as:
- It directly constructs the output in lex order.
- Each number is generated once, so time is O(n).
- Space is O(1) (ignoring output), as only a few variables are used for DFS/traversal[2][1].

### Corner cases to consider  
- n == 1 (minimum input)
- n < 10 (all single-digit)
- n just below a new power of 10 (e.g., n=99, n=999)
- n is a round power of 10 (e.g., n=100)
- Large n (to test efficiency)
- Transitions across digit boundaries (e.g., from 9 to 10, from 19 to 20)

### Solution

```python
def lexicalOrder(n: int) -> list[int]:
    result = []
    curr = 1
    for _ in range(n):
        result.append(curr)
        # Try to go deeper: append '0' at the end (curr × 10)
        if curr * 10 <= n:
            curr *= 10
        # Otherwise, try to go to the next sibling (curr + 1)
        else:
            # If at the end of level, go up until we can increase
            while curr % 10 == 9 or curr + 1 > n:
                curr //= 10
            curr += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each integer is touched once in constructing the output. No sorting needed[2][1].
- **Space Complexity:** O(1) extra space (ignoring the output list). Only a few integer variables for traversal/state[2][1].

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large, and you want the kᵗʰ smallest lexicographical number instead of the full list?  
  *Hint: Try skipping entire subtrees in DFS/preorder by counting subtree size.*

- How would you generate numbers between m and n (inclusive) in lexicographical order?  
  *Hint: Modify your starting digit and bounds during traversal.*

- Can you adapt the solution to generate lexicographically smallest numbers of length exactly d?  
  *Hint: Modify the DFS to only consider paths of length d.*

### Summary
The problem is a classic example of a lex order (dictionary/order-as-strings) traversal—essentially a pre-order traversal over a conceptual N-ary tree rooted at 1–9, expanding by appending digits. The iterative DFS solution is efficient, elegant, and avoids explicit string sorting. This pattern is broadly helpful for problems involving permutations, unique orderings, and tree-like enumerations.