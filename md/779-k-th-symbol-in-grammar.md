### Leetcode 779 (Medium): K-th Symbol in Grammar [Practice](https://leetcode.com/problems/k-th-symbol-in-grammar)

### Description  
You are given an interesting sequence of rows, each row a binary string, built using the row above based on these rules:
- The first row is "0".
- For each subsequent row, every '0' in the previous row is replaced with "01", every '1' is replaced with "10".
Given integers `n` and `k`, return the symbol at the kᵗʰ position in the nᵗʰ row (both 1-indexed)--without generating the full row, which would be prohibitively large for large n.  

### Examples  

**Example 1:**  
Input: `n = 1, k = 1`  
Output: `0`  
Explanation: Row 1 = "0". The 1ˢᵗ symbol is 0.

**Example 2:**  
Input: `n = 2, k = 1`  
Output: `0`  
Explanation: Row 2 is formed by replacing '0' with "01" ⇒ "01". The 1ˢᵗ symbol is 0.

**Example 3:**  
Input: `n = 2, k = 2`  
Output: `1`  
Explanation: Row 2 = "01". The 2ⁿᵈ symbol is 1.

**Example 4:**  
Input: `n = 3, k = 3`  
Output: `1`  
Explanation: Row 2 is "01", row 3: "0110". The 3ʳᵈ symbol is 1.

**Example 5:**  
Input: `n = 4, k = 5`  
Output: `1`  
Explanation: Row 3 is "0110", row 4: "01101001". Symbol at position 5 is 1.

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to actually build the string row by row, but this quickly becomes infeasible because the row lengths double each time (row n has length 2ⁿ⁻¹). For example, row 30 has over 500 million symbols.

There's a recursive pattern:  
- Each row is built by expanding each symbol in the previous row.
- For any position k in row n, you can relate it to a position in row n-1.  
- For every symbol in row n-1:  
    - Its left child (in row n) is the same as itself.
    - Its right child is the flipped version.
- For the kᵗʰ symbol in row n:
    - If k is in the first half, it's the same as its parent in the previous row.
    - If k is in the second half, it's the flipped version of its parent.

So, we solve recursively for row n-1, position ⌊k/2⌋ (or (k+1)//2 for 1-indexing), then possibly flip the result.

This leads to a **divide and conquer / recursion** pattern, where the subproblems get smaller each time.

### Corner cases to consider  
- n = 1, k = 1 (smallest input; should return 0)
- k at the very beginning (k = 1) or at the very end of the row (k = 2ⁿ⁻¹)
- Check that k always falls within the valid range [1, 2ⁿ⁻¹]
- Very large n (e.g. n = 30)
- k odd vs. k even

### Solution

```python
def kthGrammar(n: int, k: int) -> int:
    # Base case: first row, only one symbol, always '0'
    if n == 1:
        return 0
    
    # Find the parent position in previous row
    parent = kthGrammar(n - 1, (k + 1) // 2)
    
    # If k is odd, it's the same as the parent; if even, it's the flip
    if k % 2 == 1:
        return parent
    else:
        return 1 - parent  # flip 0<->1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each recursion level reduces n by 1, called at most n times.
- **Space Complexity:** O(n) due to the recursion stack (calls from n down to 1).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement the same logic iteratively so there is no recursion stack?
  *Hint: Start at the leaf and walk up to the root, counting the number of flips along the way.*

- What's the value of kth symbol for a very large n and k--could we avoid even O(n) recursion?
  *Hint: Think about the relationship between k and the number of times we need to flip.*

- Can you compute the answer using bit operations?
  *Hint: The number of 1-bits in (k-1) tells you how many flips occur from root to leaf.*

### Summary
This problem is a classic example of a **recursion / divide-and-conquer** pattern based on self-similarity and parent-child relationships, tightly related to binary trees. Recognizing the flipping relationship, and efficiently mapping positions from the current row to the previous row, is typical for problems involving recursively-built structures like binary trees, Gray codes, and fractal strings.


### Flashcard
Recursively determine the kᵗʰ symbol by noting it flips whenever k is odd in its parent; use k//2 to trace up and count flips.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation), Recursion(#recursion)

### Similar Problems
