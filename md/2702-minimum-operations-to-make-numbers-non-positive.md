### Leetcode 2702 (Hard): Minimum Operations to Make Numbers Non-positive [Practice](https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive)

### Description  
Given an array `nums` of non-negative integers and two positive integers `x` and `y` (with `y < x`), you can, in one operation, choose any index \(i\) and:
- Subtract `x` from `nums[i]`, and
- Subtract `y` from every other element.

Each operation aims to reduce the numbers. Your goal is to find the minimum number of operations required to make **every element in `nums` less than or equal to 0**.

### Examples  

**Example 1:**  
Input: `nums = [3,4,1,7,6]`, `x = 4`, `y = 2`  
Output: `3`  
Explanation:  
- Operation 1 (choose i = 3): `nums = [1,2,-1,3,4]`  
- Operation 2 (choose i = 3): `nums = [-1,0,-3,-1,2]`  
- Operation 3 (choose i = 4): `nums = [-3,-2,-5,-3,-2]`  
All numbers are now ≤ 0.

**Example 2:**  
Input: `nums = [1,2,1]`, `x = 2`, `y = 1`  
Output: `1`  
Explanation:  
- Choose i = 1: `nums = [0,0,0]`

**Example 3:**  
Input: `nums = [8,5]`, `x = 5`, `y = 2`  
Output: `2`  
Explanation:  
- Operation 1 (choose i = 0): `nums = [3,3]`  
- Operation 2 (choose i = 0): `nums = [-2,1]`  
- Operation 3 (choose i = 1): `nums = [-4,-4]`  
But with better order:  
- Operation 1 (choose i = 1): `nums = [6,0]`  
- Operation 2 (choose i = 0): `nums = [1,-2]`  
- Operation 3 (choose i = 0): `nums = [-4,-4]`  
Both require 3 operations.  
*(If you spot a possible 2-op minimum, check with interviewer; this example shows greedy is not always optimal.)*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible operation sequences. For each step, for each index, try applying the operation recursively and pick the minimum. This explodes combinatorially (O(n^k)).
- **Observation:** The operation affects numbers **asymmetrically**: one by x, others by y. But since y < x, it's *optimal* to "focus" operations on the largest numbers as long as possible.
- **Key reduction:** For each number, since picking it as the target nᵢ times means it is hit with (x−y) larger decrement each time it’s chosen, while being reduced by y for all other operations. We can **binary search the answer**: For a guess t, is there a way to distribute t operations so every element gets reduced to ≤ 0?  
  Try all possible ways each element could be targeted (#times) among t operations and see if possible.
- **Implementation:** Try all possible allocations of operation-counts per index such that the sum is t (for t from 1 up), and check feasibility. 
- For n ≤ 10, this is tractable using brute-force or backtracking.
- **Trade-off:** The approach is essentially "binary search the answer" + "for each t, check by backtracking all possible assignments for which index gets targeted how many times".

### Corner cases to consider  
- All numbers already ≤ 0  
- Only one element  
- All elements are the same  
- nums length = 10 (largest possible)  
- x barely greater than y (x = y + 1)  
- One number is much bigger than others  
- Impossible case (theoretically shouldn't happen as x, y > 0 and constraints valid)  

### Solution

```python
def minimumOperations(nums, x, y):
    # Helper: Can we finish in 't' operations?
    def can_finish(t):
        # For each subset S of size t: S[i] = # times we choose nums[i] as "main"
        # We want sum(S) == t and for all i,
        #   decrease = S[i] * (x-y) + y*t
        #   nums[i] - decrease <= 0
        # I.e., S[i] >= ceil((nums[i] - y*t)/(x-y)), if x != y
        # Backtrack all possible integer tuples for allocation!
        res = [0]*len(nums)
        def dfs(pos, remain):
            if pos == len(nums):
                if remain == 0:
                    for i, a in enumerate(res):
                        dec = a*(x-y) + y*t
                        if nums[i] - dec > 0:
                            return False
                    return True
                return False
            # S[i] in [lo, remain]
            lo = 0
            if x != y:
                lo = max(0, (nums[pos] - y*t + (x-y) - 1)//(x-y))
            for take in range(lo, remain+1):
                res[pos] = take
                if dfs(pos+1, remain-take):
                    return True
            return False
        return dfs(0, t)
    
    # Binary search on t in [1, max possible steps]
    low, high, ans = 1, max((n + y - 1)//y for n in nums), -1
    while low <= high:
        mid = (low + high)//2
        if can_finish(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(C(n+t−1, n−1) × n × log(max_num/y)), where n = len(nums), t ≈ max element/y. For n ≤ 10, this is feasible; combinatorial for larger n.
- **Space Complexity:** O(n) for recursive stack/res, and O(1) extra. No significant memory usage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you compute the minimum in O(1) time if all numbers are equal?  
  *Hint: What is the effect of each operation if you always pick the same index?*

- What if x = y + 1?  
  *Hint: How quickly do numbers decrease if you can barely do better than decrement all by y?*

- Can you optimize for larger n if allowed?  
  *Hint: Is there a greedy or DP approach if the input is larger or has more structure?*

### Summary
This is a "minimal operations" problem for state transitions where an operation affects one item more than the others (Hybrid Greedy + Binary Search on answer + Brute Force partitioning). This pattern shows up in problems where you control both the number and the *target* of non-uniform state transitions; similar logic appears in "minimum moves to make all elements equal" with non-uniform moves, or in some resource allocation/minimization DP problems. The core is "guess-and-check (binary search the answer) + enumerate possibilities."

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
