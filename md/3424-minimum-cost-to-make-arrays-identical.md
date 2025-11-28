### Leetcode 3424 (Medium): Minimum Cost to Make Arrays Identical [Practice](https://leetcode.com/problems/minimum-cost-to-make-arrays-identical)

### Description  
Given two integer arrays **arr** and **brr** of the same length (_n_), you can make them identical by any number of operations.  
In one operation, choose any index and add or subtract a positive integer _x_ (any positive integer) to arr[i]. The cost for each such operation is _x_ (the amount added/subtracted).  
Your task is to **return the minimum total cost** to make arr and brr identical (i.e., arr[i] == brr[i] for all 0 ≤ i < n).

### Examples  

**Example 1:**  
Input: `arr = [2,3,1], brr = [4,1,3], k = 0`  
Output: `4`  
*Explanation:  
- Try to directly make arr and brr equal at each position:  
  abs(2-4) + abs(3-1) + abs(1-3) = 2 + 2 + 2 = 6  
- However, you can sort both arrays and match elements, since rearranging allows you to minimize the sum:  
  arr→[1,2,3], brr→[1,3,4]  
  The total cost is abs(1-1) + abs(2-3) + abs(3-4) = 0 + 1 + 1 = 2.  
- You must also consider the possible cost k, but here k=0.  
  The minimum is min(6, 2+0) = 2. So the minimum cost = `2`.  
*(If k > 0: You'd add k to the rearranged solution.)*

**Example 2:**  
Input: `arr = [5,7,8], brr = [6,4,9], k = 10`  
Output: `12`  
*Explanation:  
- No rearrangement: abs(5-6)+abs(7-4)+abs(8-9) = 1+3+1 = 5.  
- Rearranged: arr→[5,7,8], brr→[4,6,9] (sort both).  
  abs(5-4)+abs(7-6)+abs(8-9) = 1+1+1=3.  
  But, 'using sort' has a flat cost k (since you must sort), so cost=3+10=13.  
- Minimum cost: min(5,13) = 5.*

**Example 3:**  
Input: `arr = [1,3,5], brr = [2,4,6], k = 2`  
Output: `4`  
*Explanation:  
- No rearrangement: abs(1-2)+abs(3-4)+abs(5-6) = 1+1+1 = 3  
- Sorted: arr→[1,3,5], brr→[2,4,6]:  
  abs(1-2)+abs(3-4)+abs(5-6) = 1+1+1 = 3  
  Sorted cost = 3+2 = 5  
- So min(3,5) = 3*

### Thought Process (as if you’re the interviewee)  
- **Start with brute-force:**   
  One way to make both arrays identical is to change arr[i] to brr[i] at every index. The cost is ∑|arr[i]−brr[i]|.  
- **Optimization idea:**  
  If we are allowed to rearrange elements (by sorting both arrays before matching), we can try matching largest to largest, smallest to smallest, etc., minimizing the pairwise distance sum. In some variants, this only works if explicit sorting is allowed, and may incur a fixed cost _k_ for rearrangement.  
- **Final approach:**  
  - Compute cost1: sum of abs difference at original indices (no sorting).  
  - Compute cost2: sort both arrays; sum abs difference of elements at matching indices; add flat cost _k_.  
  - Return `min(cost1, cost2)`.  
  - **Why does this work?**  
    Sorting both arrays and pairing minimises total moves (by the Rearrangement Inequality).  
    The trade-off is: if k is large, sorting isn't worth it; if k is small, sorting helps if original arr and brr are poorly aligned.

### Corner cases to consider  
- Arrays are already identical ⇒ minimum cost 0.
- k=0 ⇒ always take sorted solution if it reduces cost.
- All elements in arr or brr are the same.
- Arrays with only 1 element.
- Arrays with negative numbers.
- Large k (prefer non-sort path even if it's more costly element-wise).
- Duplicates in arrays.

### Solution

```python
def minCost(arr, brr, k):
    # Compute cost without sorting: match elements in original order
    cost1 = sum(abs(a - b) for a, b in zip(arr, brr))
    
    # Compute cost with sorting: sort both, match indices, add flat cost k
    arr_sorted = sorted(arr)
    brr_sorted = sorted(brr)
    cost2 = k + sum(abs(a - b) for a, b in zip(arr_sorted, brr_sorted))
    
    return min(cost1, cost2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
  - Sorting arr and brr each take O(n log n).
  - Abs difference sums are O(n).
  - So total is O(n log n).
- **Space Complexity:** O(n)
  - Extra space for sorted copies of arr and brr.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rearrangement isn’t allowed, or k is infinite?  
  *Hint: Use only the first (no-sort) cost.*

- If arrays are extremely large (10⁷ elements), how can you optimize it?  
  *Hint: Try in-place sort or minimize allocations.*

- If you are allowed to choose which elements to match (not necessarily sorted order), can you do better?  
  *Hint: Sorting both and matching in order already gives minimum total absolute diff (the Rearrangement Inequality).*

### Summary
This problem uses the **greedy + sorting pattern** to minimize total adjustments when matching two arrays.  
It leverages the **Rearrangement Inequality**, which ensures pairing smallest to smallest (and so on) gives minimum sum of absolute differences.  
This approach and code pattern commonly applies to array matching, goal-seeking via pairwise cost minimization, and canonical cases like assignment or resource allocation problems.


### Flashcard
Compute the cost of direct assignment ∑|arr[i] − brr[i]|; optionally, sort both arrays and compute the cost of sorted matching to find the minimum.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
