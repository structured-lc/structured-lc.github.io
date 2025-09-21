### Leetcode 3684 (Easy): Maximize Sum of At Most K Distinct Elements [Practice](https://leetcode.com/problems/maximize-sum-of-at-most-k-distinct-elements)

### Description  
Given an integer array `nums` and an integer `k`, you are allowed to choose at most `k` distinct elements from `nums`. Each element can only be chosen once. Your goal is to find the **maximum possible sum** you can obtain by picking up to `k` distinct elements.

- Return the maximum sum achievable by selecting at most `k` distinct elements from the array.

### Examples  

**Example 1:**  
Input: `nums=[5,5,3,1], k=2`  
Output: `8`  
*Explanation: The optimal sum is obtained by picking 5 and 3 (two largest distinct elements). 5+3=8.*

**Example 2:**  
Input: `nums=[7,7,7,7], k=3`  
Output: `7`  
*Explanation: Only 7 is present (one distinct element), so you can pick at most one, regardless of k. Output is 7.*

**Example 3:**  
Input: `nums=[2,4,6,8], k=3`  
Output: `18`  
*Explanation: Take the largest three distinct elements: 8+6+4=18.*

### Thought Process (as if you’re the interviewee)  
First, I identify that the *optimal solution* is always to select the largest available distinct elements up to `k`:

- **Brute-force idea:** Generate all combinations of up to `k` distinct elements, calculate their sums, and pick the maximum. However, this is not feasible for large arrays due to combinatorial explosion.
- **Optimized:** The sum will always be maximal when taking the largest possible values, so:
  - Remove duplicates from `nums` by using a set.
  - Sort the unique elements in descending order.
  - Take the top `k` elements and sum them.
- This is both efficient and easy to reason about.  
**Trade-offs:**  
- Sorting the unique elements (O(n log n)) dominates time complexity, but this is necessary to ensure we get the largest elements.

### Corner cases to consider  
- Input array is empty (`nums=[]`)  
- `k` is 0 (should return 0)  
- All elements are the same  
- Fewer than `k` distinct elements  
- `k` is larger than the number of distinct elements  

### Solution

```python
def maximizeSum(nums, k):
    # If nums is empty or k is 0, return 0 (no elements to choose)
    if not nums or k == 0:
        return 0

    # Use a set to get unique elements
    unique_nums = set(nums)

    # Sort unique elements in descending order
    sorted_unique = sorted(unique_nums, reverse=True)

    # Take up to k elements and sum them
    # If less than k unique elements, take all of them
    largest_k = sorted_unique[:k]
    total = 0
    for num in largest_k:
        total += num

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + d log d), where n is the length of nums, and d is the number of distinct elements.  
  Justification: O(n) to build the set, O(d log d) to sort the unique elements, and up to O(k) to sum the largest k values.
- **Space Complexity:** O(d), for storing the set of unique elements and the sorted list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to maximize the product, not the sum, of at most k distinct elements?  
  *Hint: Think about picking the k largest absolute values, and consider negatives when k is odd.*

- How would you modify the solution if you could pick elements with repetition?  
  *Hint: If duplicates are allowed, just pick the largest element k times.*

- If the array is streaming and too large to store, how would you approximate the answer?  
  *Hint: Use a min-heap of size k to keep track of the current largest k distinct elements seen so far.*

### Summary  
The approach is a classic *greedy selection* problem: always take the largest available (distinct) elements to maximize the sum. This pattern—sorting unique values and selecting top k—is common in problems involving maximizing/minimizing from collections with duplicate constraints. Similar logic applies to frequency-limited selection, top-k queries, and set-restriction selection in competitive programming.

### Tags

### Similar Problems
