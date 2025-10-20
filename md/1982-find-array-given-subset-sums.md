### Leetcode 1982 (Hard): Find Array Given Subset Sums [Practice](https://leetcode.com/problems/find-array-given-subset-sums)

### Description  
Given a list of all subset sums (in any order) for some unknown array of length *n*, reconstruct any possible version of the original array.

- Each subset sum is the sum of some subset of the array (including the empty subset, which sums to 0).
- The subset sums array has length 2ⁿ.
- Multiple valid answers may exist; returning any is acceptable.

In other words: "Here are all possible sums obtained from subsets of a secret n-element array. What could the original array have been?"

### Examples  

**Example 1:**  
Input: `n = 3, sums = [0, -3, -2, -1, 1, 2, 3, 4]`  
Output: `[1, -2, 3]`  
*Explanation: All subset sums of [1, -2, 3] are:*
```
0         (empty)
1         ([1])
-2        ([-2])
3         ([3])
1+-2 = -1 ([1,-2])
1+3  = 4  ([1,3])
-2+3 = 1  ([-2,3])
1+-2+3=2  ([1,-2,3])
```

**Example 2:**  
Input: `n = 2, sums = [0, 1, 3, 4]`  
Output: `[1, 3]`  
*Explanation: All subset sums are:*  
0 (empty), 1 ([1]), 3 ([3]), 1+3=4 ([1,3])

**Example 3:**  
Input: `n = 1, sums = [0, -5]`  
Output: `[-5]`  
*Explanation: Only one element: its subsets are [] and [-5].

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  - Try all possible integer arrays of size n, generate all subset sums, and compare with `sums`.
  - Not feasible – this is exponential in both search space and subset generation (double exponential).

- **Optimized idea:**  
  - Notice: With n elements, the subset sums set can be recursively split as follows:
    - For each element x, the 2ⁿ subset sums can be split between those **with** and **without** x.
    - Sorting `sums` helps: the smallest element is always the sum of all negative elements (possibly just the empty set, which is always 0).
    - Find the *smallest positive difference* between the smallest and the next-smallest element—that’s a candidate for an original element (say, `num`).
    - Divide `sums` into two groups: group A (those that *don’t* include `num`), and group B (those that *do* include `num`), matching up pairwise (A[i] and A[i]+num).
    - Remove group B from `sums` (since their "without num" mates are in group A).
    - Recursively recover the rest of the array.
    - We need to take care with positive and negative versions of the element, as either could be present.

- **Why recursive set subtraction works:**  
  - Every subset sum of the (n-1)-length array appears twice: once as is, and once with `num` added to it.
  - By always removing pairs, we guarantee all combinations are covered.

- **Tradeoffs:**  
  - Recursive set manipulation can be slow if implemented naively (unordered list search).
  - Using `Counter` or similar mapping (dictionary) to count available subset sums at each split helps performance.
  - Due to problem constraints (small n, practical inputs), O(n × 2ⁿ) is acceptable.

### Corner cases to consider  
- n = 1 (base case)
- All elements in the original array are negative or positive.
- Multiple elements with the same value (duplicates)
- Large |values| (to check if overflow occurs – not an issue for Python)
- Subset sums with duplicates (the input may contain repeated sums if original elements repeat)
- Only zeros: sums = [0,0,0,0] for array [0,0]

### Solution

```python
from collections import Counter

def recoverArray(n, sums):
    # Base case: if n == 1, just return the other element that sums with 0
    if n == 1:
        for x in sums:
            if x != 0:
                return [x]
    
    # Sort to make pairing predictable
    sums.sort()
    # Find the difference between smallest two: candidate element (could be negative)
    diff = sums[1] - sums[0]  # get minimal possible element value
    # Try both +diff and -diff, since negative/positive could exist
    for candidate in [diff, -diff]:
        counts = Counter(sums)
        groupA = []
        groupB = []
        for x in sums:
            if counts[x] > 0:
                groupA.append(x)
                counts[x] -= 1
                pair = x + candidate
                counts[pair] -= 1
                groupB.append(pair)
        # Check which group contains 0 (the empty subset),
        # since the root of the tree must contain 0
        if 0 in groupA:
            # Elements not including candidate
            rest = recoverArray(n-1, groupA)
            return rest + [candidate]
    # The above logic guarantees one answer according to problem constraints
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ).  
  - At each level, we operate on sums with at most 2ⁿ elements, for n levels. Matching-up with counter is O(2ⁿ) per level.
- **Space Complexity:** O(2ⁿ), to hold all subset sums and intermediate arrays at each recursion step.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution handle very large n?
  *Hint: Discuss if and how you would optimize with more memory or faster subset sum search (but realize O(2ⁿ) is hard limit).*

- What if the order of the original array matters (return lex smallest)?
  *Hint: Modify recursion to always prefer the smallest absolute candidate first.*

- Is it possible for input sums to not correspond to any real array?
  *Hint: Talk about constraints and input validity.*

### Summary
This problem is a classic **reverse-combinatorics**/subset-reconstruction recursive problem, and the core approach is recursively extracting elements by observing how the subset sum multiset changes when including/excluding each found element. It’s related to subset-sum, bitmasking, recursive backtracking, and multiset manipulation—classic in problems involving subsets, powersets, and reconstructing from aggregate data.


### Flashcard
Reconstruct the array by recursively splitting sorted subset sums into those with and without each element, always extracting the smallest difference.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer)

### Similar Problems
- Subsets(subsets) (Medium)
- Subsets II(subsets-ii) (Medium)
- Recover the Original Array(recover-the-original-array) (Hard)