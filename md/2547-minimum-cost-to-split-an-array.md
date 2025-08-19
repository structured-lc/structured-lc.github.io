### Leetcode 2547 (Hard): Minimum Cost to Split an Array [Practice](https://leetcode.com/problems/minimum-cost-to-split-an-array)

### Description  
We are given an integer array **nums** and an integer **k**. The task is to split **nums** into some number of **non-empty subarrays**. The **cost** of a split is the sum of the **importance value** of each subarray.

- To find the importance of a subarray:
  - Remove all numbers that appear only once in the subarray (this is called the "trimmed" subarray).
  - The **importance value** of a subarray is **k + length of trimmed(subarray)**.

The objective is to **split nums to minimize the total cost** as per the importance rule above.

---

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,2,1,3,3], k = 2`  
Output: `8`  
*Explanation: Split [1,2,1,2,1,3,3] as [1,2,1,2,1], [3,3].  
- For [1,2,1,2,1], after trimming: [1,2,1,2,1] ⇒ [1,2,1,2,1] (since every 1 and 2 appear >1 time, nothing is removed): Length = 5. Importance = 2+5=7.  
- For [3,3], after trimming: [3,3] ⇒ [3,3] (both appear more than once): Length = 2. Importance = 2+2=4.  
But by optimal splitting, you can do [1,2,1,2,1], [3], [3]:  
[1,2,1,2,1]: trimmed = [1,2,1,2,1], length=5⇒ cost=7.  
[3]: trimmed=[], length=0⇒ cost=2.  
[3]: trimmed=[], length=0⇒ cost=2.  
Total:7+2+2=11.  
But with [1,2,1,2,1,3],[3]:  
[1,2,1,2,1,3]: only 3 occurs once—trim to [1,2,1,2,1], length=5⇒ cost=7.  
[3]: empty, cost=2.  
Total:7+2=9.  
Optimal in this case is [1,2,1,2,1],[3,3]: cost=7+4=11.  
But best is no split: ([1,2,1,2,1,3,3]),  
- 1,2 occur >1, 3 occurs 2× ⇒ no trim; length=7, cost=2+7=9.  
But optimal splitting yields 8 (with detailed DP).*

**Example 2:**  
Input: `nums = [1,2,1,2,1], k = 2`  
Output: `5`  
*Explanation: No split needed; trimmed([1,2,1,2,1]) = [1,2,1,2,1], length=5; cost=2+5=7.*

**Example 3:**  
Input: `nums = [1,2,3,4,5], k = 2`  
Output: `10`  
*Explanation: Each number only appears once.  
Best split is making each as a separate subarray: five subarrays.  
Every subarray trimmed: empty [] ⇒ length=0; importance=2.  
Cost = 2+2+2+2+2 = 10.*

---

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible splits, calculate the importance for each subarray formed, sum up total cost, and return the minimum across all split combinations. This is exponential (number of split possibilities is O(2ⁿ)), so not feasible for n up to 1000.

- **Optimal Approach:**  
  Use **Dynamic Programming**:
  - Let `dp[i]` be the minimum cost to partition the suffix nums[i:]:
    - For every possible next cut at position j (i ≤ j < n):
      - Calculate the importance value of nums[i:j+1], then recursively add dp[j+1].
      - Keep a frequency table as you slide j, to track which numbers have occurred more than once (used to compute length of trimmed subarray efficiently).
    - For each starting index i, try all possible end indices j, and pick the min.
  - Use memoization/cache to avoid recomputation.
  - Complexity: For each start index, O(n) possible ends, and O(1) to O(n) to maintain counts, leading to O(n²) time.

- **Trade-Offs:**  
  - Time: O(n²); handles n up to 1000 comfortably.
  - Space: O(n) DP array + O(n) count per recursion + potentially O(n²) for full memoization table.

---

### Corner cases to consider  
- Array with all unique elements (every number occurs only once).
- All elements the same (maximally overlapped).
- k = 0.
- Array of length 1.
- Very large k (try to avoid overflows).
- input nums contains negative values or 0.

---

### Solution

```python
def minCost(nums, k):
    n = len(nums)
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base case: no elements left

    for i in range(n - 1, -1, -1):
        count = {}
        trimmed_len = 0
        for j in range(i, n):
            num = nums[j]
            count[num] = count.get(num, 0) + 1
            if count[num] == 2:
                trimmed_len += 2
            elif count[num] > 2:
                trimmed_len += 1
            # Cost: k + length of trimmed(subarray)
            cost = k + trimmed_len + dp[j + 1]
            dp[i] = min(dp[i], cost)
    return dp[0]
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each starting index, we scan ahead to all n possible end indices, updating the counts. Each subarray considered in O(1) to O(n) due to map, but bounded by n.
- **Space Complexity:** O(n)  
  DP array uses O(n) space; the count map at most tracks O(n) keys per subarray.

---

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for the case when k is much larger than n?  
  *Hint: What does the cost formula look like when k dominates?*

- How would you adapt your solution if the cost function or trimming rule changed?  
  *Hint: How modular is your cost calculation?*

- Can you return the actual splits, not just the minimal cost?  
  *Hint: Record the split indices while filling your DP.*

---

### Summary  
This problem is a classic example of **DP over subarrays with custom cost evaluation**, requiring computation for every subproblem and overlapping optimal substructure. The core LeetCode pattern leveraged is **"DP with rolling frequency table"**. This pattern appears in various **partitioning/segmentation optimization** problems (e.g., min cost palindromic partition, min sum for k partitions, etc.). It tests ability to model complex cost with dynamic state.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Counting(#counting)

### Similar Problems
- Coin Change(coin-change) (Medium)
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Divide an Array Into Subarrays With Minimum Cost II(divide-an-array-into-subarrays-with-minimum-cost-ii) (Hard)
- Minimum Sum of Values by Dividing Array(minimum-sum-of-values-by-dividing-array) (Hard)
- Minimum Cost to Divide Array Into Subarrays(minimum-cost-to-divide-array-into-subarrays) (Hard)