### Leetcode 77 (Medium): Combinations [Practice](https://leetcode.com/problems/combinations)

### Description  
Given two integers **n** and **k**, return all possible combinations of **k** numbers chosen from the numbers **1** to **n**, inclusive.  
Order of combinations in the output does **not** matter, but each combination should be unique and include exactly **k** numbers, with elements in each combination in ascending order (as each element is strictly greater than those before it).  
You must **not** generate duplicate combinations (e.g., `[1,2]` and `[2,1]` are the same combination).

### Examples  

**Example 1:**  
Input: `n=4, k=2`  
Output: `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`  
Explanation: We need all 2-number combinations from 1..4. For each first number, the second can be any higher number. There are 6 unique pairs.

**Example 2:**  
Input: `n=1, k=1`  
Output: `[[1]]`  
Explanation: Only one possible choice, picking 1.

**Example 3:**  
Input: `n=3, k=3`  
Output: `[[1,2,3]]`  
Explanation: Only one way to choose all three numbers from [1,2,3].

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Consider every possible k-length combination from 1..n.  
  There are C(n, k) total possible combinations, and for each we can check if it is unique. However, generating all subsets and filtering for size k would be inefficient.

- **Backtracking / DFS:**  
  Use **backtracking** to efficiently build up combinations:  
  - Start from an initial number (`start`), recursively try all higher numbers to avoid duplicates and preserve order.  
  - At each step, if the current list’s length == k, add it to result.  
  - Otherwise, keep adding the next possibility, recursively exploring deeper.
  - After recursive call, **backtrack** (remove last added no.) to try another option.

- **Why this approach:**  
  - Avoids generating duplicates and guarantees ascending order (since we always increment start).
  - Efficient, only explores valid paths, O(C(n, k)) total combinations.

### Corner cases to consider  
- k = 0 or n = 0 → should return `[[]]` or `[]` (clarify with interviewer)  
- k > n → impossible to pick, expect `[]`  
- k = n → only one combination, all numbers from 1 to n  
- k = 1 → each number by itself  
- Negative values for n or k (if possible): input validation

### Solution

```python
def combine(n, k):
    result = []

    def backtrack(start, path):
        # If combination is of right length, add to result
        if len(path) == k:
            result.append(path[:])
            return
        # Iterate from current start up to n
        for num in range(start, n + 1):
            path.append(num)            # add current number
            backtrack(num + 1, path)    # recurse with next number
            path.pop()                  # remove last, backtrack

    backtrack(1, [])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(C(n, k) × k):  
  There are C(n, k) total unique combinations, and each combination might take up to k to build and copy.

- **Space Complexity:**  
  O(C(n, k) × k) for output storage, since all combinations are stored.  
  O(k) for the recursion stack at any moment.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate combinations if the input array has duplicates or is unordered?  
  *Hint: Sorting the array and skipping over duplicate elements may be needed.*

- If the input is very large, how could you yield combinations one by one instead of building all in memory?  
  *Hint: Use Python generators (`yield`) to lazily emit results.*

- How would you generate permutations (order matters) instead of combinations?  
  *Hint: Try not to fix the start index, consider every possibility.*

### Summary
This problem is a classic example of the **backtracking** (recursive decision tree) pattern.  
It efficiently builds up solutions by exploring only valid extensions, avoiding duplicates by always moving forward in the candidate space (“start” grows).  
This approach is very common for generating combinations, subsets, permutations, and has applications in problems like N-Queens, subset sums, and generating all valid parenthesis strings.