### Leetcode 2344 (Hard): Minimum Deletions to Make Array Divisible [Practice](https://leetcode.com/problems/minimum-deletions-to-make-array-divisible)

### Description  
You are given two arrays of positive integers, **nums** and **numsDivide**. You can delete any number of elements from **nums**.  
Your task is to find the **minimum number of deletions** required in `nums` so that the **smallest** element left in `nums` divides **all** elements in `numsDivide`.  
If it's not possible, return **-1**.

- *An integer x divides y if y % x == 0.*

### Examples  

**Example 1:**  
Input: `nums = [2,3,2,4,3]`, `numsDivide = [9,6,9,3,15]`  
Output: `2`  
Explanation:  
Delete two 2’s from `nums` to get `[3,4,3]`. The smallest element is 3; 3 divides all elements in `numsDivide`:  
9%3==0, 6%3==0, 9%3==0, 3%3==0, 15%3==0.

**Example 2:**  
Input: `nums = [4,3,6]`, `numsDivide = [8,2,6,10]`  
Output: `-1`  
Explanation:  
No possible way:  
- 3 remains? 8%3 != 0  
- 4 remains? 2%4 != 0  
- 6 remains? 2%6 != 0  
So, it's impossible.

**Example 3:**  
Input: `nums = [6,8,9]`, `numsDivide = [24,36,18]`  
Output: `0`  
Explanation:  
Smallest is 6; 24%6==0, 36%6==0, 18%6==0.  
No deletions needed.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible subsets of `nums`, for each, check if the smallest can divide all elements in `numsDivide`. This is infeasible (2ⁿ possibilities).

- **Optimization:**  
  Instead, note that any answer will use some element x from `nums` as the smallest that divides `numsDivide`.  
  Therefore:
  1. Compute the gcd G of all elements in `numsDivide`.  
  2. Find the smallest element in `nums` that divides G.
  3. Delete all elements in `nums` less than this value.

- **Reasoning:**  
  Since x divides all values in `numsDivide` ⟺ x divides gcd(numsDivide).  
  Only need to check if there's some x in `nums` such that G%x==0, then pick the smallest such x.  
  Among all candidates x, keep the smallest, and delete all elements from `nums` smaller than x.

- **Implementation plan:**
  - Compute G = gcd of `numsDivide`
  - Sort `nums`.
  - For each x in sorted `nums`, check if G%x==0. The first hit at position i is the answer (i deletions).
  - If not found, return -1.

### Corner cases to consider  
- `nums` or `numsDivide` with length 1  
- All elements in `nums` are the same  
- Elements in `nums` not dividing any in `numsDivide`  
- Large numbers to check for overflow or efficiency  
- The smallest element in `nums` already divides all in `numsDivide` (no deletions needed)  
- No common divisor candidates present

### Solution

```python
def minDeletions(nums, numsDivide):
    # Helper to compute gcd of two numbers
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    # Compute gcd of whole numsDivide array
    from functools import reduce
    g = reduce(gcd, numsDivide)

    # Sort nums so deletions = index of the first valid element
    nums.sort()

    for i, x in enumerate(nums):
        if g % x == 0:
            return i  # All elements before i are deleted
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n + m), where n = len(nums), m = len(numsDivide).  
  - O(m) for gcd reduction.  
  - O(n log n) for sorting nums.  
  - O(n) for linear scan after sort.

- **Space Complexity:**  
  O(1) extra (in-place sort), plus possible O(m) for gcd reduction call stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` can be changed, i.e. you can increase or decrease the numbers instead of deletion?  
  *Hint: Consider minimizing the operation cost rather than deletions.*

- What if you want the smallest possible **sum** in `nums` that fulfills the same property after any deletions?  
  *Hint: See if smaller numbers always help.*

- Can you answer queries online, i.e., process multiple `numsDivide` arrays for the same `nums` efficiently?  
  *Hint: Preprocessing on `nums` may help—prime factorization, etc.*

### Summary
This problem reduces to finding the minimum number of leftward deletions in a sorted `nums` so that its smallest element divides gcd(numsDivide)—an elegant use of math, GCD, and sorting. The coding pattern is a common one (filtering candidates after an array transform + numerical checks) and can broadly apply to problems combining set reduction with divisibility or gcd constraints.