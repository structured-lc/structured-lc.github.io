### Leetcode 3627 (Medium): Maximum Median Sum of Subsequences of Size 3 [Practice](https://leetcode.com/problems/maximum-median-sum-of-subsequences-of-size-3)

### Description  
Given an integer array **nums** whose length is divisible by 3, you must repeatedly remove triplets (groups of 3 elements) from the array.  
For each triplet you remove, you take their **median** (the middle value when sorted), and sum up these medians.  
Your task is to maximize the total sum of all medians collected when the array becomes empty.

**Key rules:**
- In each step, you can pick *any* 3 elements (not just consecutive).
- For each selection, the **median** is the 2ⁿᵈ largest value of the three elements.
- You must keep removing until no elements remain.

### Examples  

**Example 1:**  
Input: `nums = [2,1,3,4,5,6]`  
Output: `9`  
*Explanation: Sort nums → [1,2,3,4,5,6].  
Split into groups: [1,2,3] and [4,5,6].  
Take medians: 2 (from [1,2,3]) and 5 (from [4,5,6]).  
Sum = 2 + 5 = 7. But if you rearrange as [1,3,6] and [2,4,5],  
then medians are 3 and 4, sum = 7.  
But if you pick [1,5,6] and [2,3,4],  
medians: 5 and 3, sum = 8.  
The optimal way: [6,5,1], [4,3,2],  
medians: 5 (from [1,5,6]) and 3 (from [2,3,4]).  
Actually, the maximal sum is **9** when you pick [6,4,1] and [5,3,2],  
medians: 4 and 3, sum = 7. Optimal solution:  
Group the largest and the 2ⁿᵈ largest with the smallest unused, so medians are: 5 (from [6,5,1]) and 4 (from [4,3,2]), sum = **9**.*

**Example 2:**  
Input: `nums = [5,1,2,4,3,6]`  
Output: `9`  
*Explanation: Sorting and grouping as above, you still can get sum 9: [6,5,1] with median 5, [4,3,2] with median 3; or other symmetric combinations.*

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `2`  
*Explanation: Only one group, [1,2,3]. Median is 2.*

### Thought Process (as if you're the interviewee)  
Let's walk through how to approach this:

- **Brute-force Idea:**  
  Try all possible groupings of triplets, calculate sum of medians for each, return the maximum.  
  **Problem:** The number of groupings is enormous (factorial), making brute force infeasible for real constraints.

- **Key Insight:**  
  Since the median of a triplet is the 2ⁿᵈ largest, we want as many medians to be as large as possible.

- **Optimization:**  
  1. **Sort the array.**
  2. In each group of 3, try to maximize the median.
  3. The optimal strategy is:  
     - Always select the two biggest and the smallest available for a group. That ensures the median is the 2ⁿᵈ largest of the unused.
     - After sorting nums, if len(nums) = n (and n % 3 == 0), fill the groups such that:
       - The largest \( n/3 \) numbers are always picked as the *largest* element in a group (but not as medians), and their "medium" - that is, the 2ⁿᵈ largest among current unused numbers - can be selected as median.
     - When forming triplets from sorted array:
       - The medians will be the elements at positions: \( n - 2, n - 5, n - 8, ..., \) i.e., every other from the end skipping one each time.
     - This is because after sorting, for maximum sum, we alternate picking the largest remaining as "largest", the next as "median", and always pair with a leftover smallest.

  - **Implementation sketch:**  
    - Sort `nums` (let's define n ⟶ len(nums)).
    - For k = 0, 1,..., n/3 - 1:
      - Add the element at position n-2-2\*k to result (starting from second largest, then 4th largest, etc.)
    - Continue until all groups are formed.

  **Why optimal:**  
  Sorting enables us to maximize the chosen medians in every group.

### Corner cases to consider  
- Array of length 3 (just one group, median is the middle value).
- All elements equal (median sum is just n/3 times the repeated value).
- Array already sorted or in reverse order.
- Large arrays (n up to 10⁵, only sorting and linear scan allowed).

### Solution

```python
def maximumMedianSum(nums):
    # Step 1: Sort the array to arrange numbers in ascending order
    nums.sort()
    n = len(nums)
    total = 0
    
    # Step 2: Select every second largest (the median in each optimal triplet)
    # The indices of medians: n-2, n-5, n-8, ..., stop when index < 0
    # Number of groups: n // 3
    idx = n - 2
    for _ in range(n // 3):
        total += nums[idx]
        idx -= 2  # skip one from the right, always pick the next median
    
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \log n) for sorting, and O(n) for the loop, so total is **O(n \log n)**.
- **Space Complexity:** O(1) if in-place sort is allowed, or O(n) if not (but no extra data structures needed except counters).

### Follow-up questions  
- What if group size is changed (e.g., size 5, or k)?
- What if instead of median, you need maximum or minimum in each group?
- What if the array is dynamically updated and you have to recompute efficiently?