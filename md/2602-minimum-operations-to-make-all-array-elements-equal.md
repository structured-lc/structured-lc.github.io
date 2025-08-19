### Leetcode 2602 (Medium): Minimum Operations to Make All Array Elements Equal [Practice](https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal)

### Description  
Given an integer array **nums** and an array of integer **queries**, for each query you must determine the minimum number of operations required to make every element in **nums** equal to the query value. You can increment or decrement elements by 1 any number of times. For each query, return the total number of increment/decrement operations needed, resetting **nums** to its original state before the next query.

### Examples  

**Example 1:**  
Input: `nums = [1,3,5], queries = `  
Output: ``  
*Explanation: To make all elements 6:  
(6-1) + (6-3) + (6-5) = 5 + 3 + 1 = 9.*  
*But actually, because each operation increments/decrements by 1, for each element we're doing abs(6-nums[i]).  
So, 5 + 3 + 1 = 9 operations (direct sum of distances for each element).*

**Example 2:**  
Input: `nums = [2,9,6,3], queries = [3, 5, 7]`  
Output: `[9, 9, 13]`  
*Explanation:*  
- For 3: (2→3 = 1), (9→3 = 6), (6→3 = 3), (3→3 = 0); Total = 1+6+3+0 = 10  
- For 5: (2→5 = 3), (9→5 = 4), (6→5 = 1), (3→5 = 2); Total = 3+4+1+2 = 10  
- For 7: (2→7 = 5), (9→7 = 2), (6→7 = 1), (3→7 = 4); Total = 5+2+1+4 = 12  

**Example 3:**  
Input: `nums = [1, 2, 4, 8], queries = [4, 5]`  
Output: `[7, 9]`  
*Explanation:*  
- For 4: (1→4 = 3), (2→4 = 2), (4→4 = 0), (8→4 = 4); Total = 3+2+0+4 = 9  
- For 5: (1→5 = 4), (2→5 = 3), (4→5 = 1), (8→5 = 3); Total = 4+3+1+3 = 11  

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every query, iterate through all nums, summing abs(query - nums[i]) for each element. Time is O(n × m), where n is len(nums) and m is len(queries).
- **Optimization:** Since queries can be large and nums too, brute force is slow for large input.
- **Key observation:** Operations depend on the difference between each number and the query. By sorting nums and using a prefix sum, we can compute results for each query quickly using binary search:
    - For each query, partition nums by lower than, equal to, and greater than the query.
    - For nums < query, need to add (query - num); for nums > query, need to subtract (num - query).
    - Precompute prefix sums. For each query, use binary search to find how many elements are less than or equal to the query.
    - Example:  
        - Let k = index of the first number ≥ query (using bisect_right).
        - The total add needed is: query × k - sum(nums[:k])
        - The total subtract needed is: sum(nums[k:]) - query × (n - k)
        - Total = add + subtract
- **Selected approach:** Prefix sums + sort + binary search keeps each query O(log n), for total O(n log n + m log n).

### Corner cases to consider  
- Empty `nums` or `queries` arrays.
- All numbers in `nums` already equal to each query.
- All elements less than or greater than the query.
- Duplicates in the arrays.
- Large input values.

### Solution

```python
def min_operations(nums, queries):
    # Sort nums for efficient prefix use and binary search
    nums.sort()
    n = len(nums)
    
    # Precompute prefix sums (sums[i] = sum(nums[0] to nums[i-1]))
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]
    ans = []
    
    # Helper: binary search for number of elems ≤ q
    def bsearch(q):
        # returns the leftmost index where nums[i] > q
        low, high = 0, n
        while low < high:
            mid = (low + high) // 2
            if nums[mid] <= q:
                low = mid + 1
            else:
                high = mid
        return low
    
    for q in queries:
        k = bsearch(q)
        # Elements < q: need increase ((q × k) - prefix[k])
        add = q * k - prefix[k]
        # Elements ≥ q: need decrease (prefix[n] - prefix[k]) - (n - k) × q
        subtract = prefix[n] - prefix[k] - (n - k) * q
        ans.append(add + subtract)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + m log n).  
    - O(n log n) for sorting nums, O(n) for prefix sum.
    - For each of m queries, O(log n) for binary search.
- **Space Complexity:** O(n) for prefix sum array plus output storage. No large auxiliary structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the queries are also very large—can this be parallelized or batched more efficiently?  
  *Hint: Consider processing queries in sorted order for possible optimizations.*

- How would you answer dynamic range queries (i.e., updating elements in `nums` between queries)?  
  *Hint: Explore segment trees or binary indexed trees for efficient updates and queries.*

- Can you optimize further if queries are all for the same set of unique values?  
  *Hint: Preprocess and cache answers for each unique query.*

### Summary
This problem uses the **prefix sum + binary search** pattern, which is common when you need to quickly compute sums/ranges based on sorted order and handle multiple queries. The approach generalizes to problems involving interval/range modifications and cost calculations over sorted values. Patterns like this also appear in problems that require solving for medians or minimizing distance/cost functions across subsets.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Moves to Equal Array Elements II(minimum-moves-to-equal-array-elements-ii) (Medium)
- Minimum Cost to Make Array Equal(minimum-cost-to-make-array-equal) (Hard)
- Sum of Distances(sum-of-distances) (Medium)