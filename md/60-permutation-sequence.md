### Leetcode 60 (Hard): Permutation Sequence [Practice](https://leetcode.com/problems/permutation-sequence)

### Description  
Given two integers **n** and **k**, return the kᵗʰ permutation of the sequence `[1, 2, ..., n]` in lexicographical order.  
- The sequence should be returned as a string.
- The permutations are 1-indexed (first permutation is k=1).

Example:  
If n = 3 → permutations in order are:
- 1: `"123"`
- 2: `"132"`
- 3: `"213"`
- 4: `"231"`
- 5: `"312"`
- 6: `"321"`

The function should return the string at position k for the given n.

### Examples  

**Example 1:**  
Input: `n = 3, k = 3`  
Output: `"213"`  
*Explanation: The lexicographical permutations are: 1 → "123", 2 → "132", **3 → "213"**, 4 → "231", 5 → "312", 6 → "321".*

**Example 2:**  
Input: `n = 4, k = 9`  
Output: `"2314"`  
*Explanation: The lexicographical permutations of `[1,2,3,4]` start as:  
1: "1234", 2: "1243", 3: "1324", 4: "1342", 5: "1423", 6: "1432",  
7: "2134", 8: "2143", **9: "2314"** ...*

**Example 3:**  
Input: `n = 1, k = 1`  
Output: `"1"`  
*Explanation: Only one digit, only permutation is `"1"`.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Generate all permutations of `[1,2,...,n]`, sort them, return the kᵗʰ entry.  
  - This is highly inefficient since permutations grow as n!  
  - For n up to 9, n! = 362,880, which is still feasible, but not optimal.

- **Optimized Mathematical approach (Factorial Number System):**  
  Notice that the number of permutations starting with each digit is fixed due to lexicographical order.  
  - For a given first digit, the remaining (n-1)! permutations cover all possible orderings.  
  - We can calculate, for each position, which unused digit should go there by updating k and using division/modulo by factorials.
  - Continue shrinking n and updating k until result is built.
  - This approach is O(n²) due to list removals, but is much better than brute-force.

- **Why use this approach?**  
  - No need to store all permutations.
  - Mathematical, clean, and efficient for allowed constraints (n ≤ 9).

### Corner cases to consider  
- n = 1: Only one permutation.
- k = 1: First permutation (should be "123...n").
- k = n!: Last possible permutation (should be sorted descending).
- High k near n!.
- Smallest/largest possible n.

### Solution

```python
def getPermutation(n, k):
    # Prepare list of candidates [1,2,3,...,n]
    nums = [str(i) for i in range(1, n + 1)]
    # Precompute factorials: (n-1)!
    factorial = 1
    factorials = [1] * n
    for i in range(1, n):
        factorial *= i
        factorials[i] = factorial
    # Convert k to 0-based index for easier calculations
    k -= 1
    ans = []
    for i in range(n, 0, -1):
        # Determine which unused number goes here
        idx = k // factorials[i - 1]
        ans.append(nums.pop(idx))
        k %= factorials[i - 1]
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - For each of n positions, we remove an element from a list (O(n) operation).
- **Space Complexity:** O(n)  
  - For nums list, factorials, and output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently return the next or previous permutation in the sequence, given any permutation?
  *Hint: Think about in-place permutation algorithms, such as next-permutation.*

- How would you handle the case where n > 9?
  *Hint: Consider how factorials and lexicographic definitions scale when n! goes beyond int/long limits.*

- Can you solve the problem in O(n) time by avoiding pop from the list?
  *Hint: Try using linked lists or building a boolean used array for O(1) removals.*

### Summary
This problem is a classic application of the factorial number system, leveraging combinatorics to find the kᵗʰ permutation directly without generating all possible sequences.  
The coding pattern is “construct the answer one digit at a time based on counting”, and this idea is applicable for combinatorial ranking/unranking, such as Sudoku generation, serialization of orderings, and direct index access in large permutation sets.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
- Next Permutation(next-permutation) (Medium)
- Permutations(permutations) (Medium)