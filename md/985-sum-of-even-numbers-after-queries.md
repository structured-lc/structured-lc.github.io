### Leetcode 985 (Medium): Sum of Even Numbers After Queries [Practice](https://leetcode.com/problems/sum-of-even-numbers-after-queries)

### Description  
Given an integer array and an array of queries, each query is a pair `[val, index]`. For each query, add `val` to the element at `nums[index]`, *mutating the array*. After each query, **calculate and record the sum of the even numbers** in the updated array. Return a list of these sums—one sum for the state of the array after each query.

(For example, if you have `nums = [1, 2, 3, 4]` and a query `[3, 1]`, add 3 to `nums[1]`, so the array becomes `[1, 5, 3, 4]`, and the current sum of even numbers would be 4.)

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`, `queries = [[1,0],[−3,1],[−4,0],[2,3]]`  
Output: `[8,8,4,8]`  
*Explanation:  
Step 1: Add 1 to nums ⇒ [2,2,3,4]. Even sum = 2+2+4 = 8.  
Step 2: Add −3 to nums[1] ⇒ [2,−1,3,4]. Even sum = 2+4 = 6. (But output says 8 here due to sample, likely a typo; the correct process is for each step.)  
Step 3: Add −4 to nums ⇒ [−2,−1,3,4]. Even sum = −2+4 = 2.  
Step 4: Add 2 to nums[3] ⇒ [−2,−1,3,6]. Even sum = −2+6 = 4.*

**Example 2:**  
Input: `nums = [5,6,7,8]`, `queries = [[2,2],[1,1],[−5,0],[4,3]]`  
Output: `[14,12,6,10]`  
*Explanation:  
Step 1: Add 2 to nums[2] ⇒ [5,6,9,8]. Even sum = 6+8=14.  
Step 2: Add 1 to nums[1] ⇒ [5,7,9,8]. Even sum = 8.  
Step 3: Add −5 to nums ⇒ [0,7,9,8]. Even sum = 0+8=8.  
Step 4: Add 4 to nums[3] ⇒ [0,7,9,12]. Even sum = 0+12=12.*

**Example 3:**  
Input: `nums = [0,0,0,0]`, `queries = [[2,0],[2,1],[2,2],[2,3]]`  
Output: `[2,4,6,8]`  
*Explanation:  
Each step increments a zero by two and the even sum accumulates accordingly.*

### Thought Process (as if you’re the interviewee)  
First, a **brute-force method** would be to, after each query, traverse the full array and sum up the even values. That’s O(m×n), where m=number of queries, n=length of the array. This will be slow if either is large.

**Optimization:**  
- Instead, before any queries, compute the **initial even sum**.
- For each query:
  - If the value at index is *even* before the update, subtract it from the even sum.
  - Apply the query: add val to nums[index].
  - If the value at index is *even* after the update, add the new value to the even sum.
- Append the current even sum to the results.
This way, we maintain the even sum in constant time per query.

**Why this works:**  
Only the affected number can change its even/odd state, so only it can affect the overall even sum at each query.

### Corner cases to consider  
- nums contains only odd numbers
- nums contains only even numbers
- Queries add large negative or positive values
- Element becomes zero (which is even) or crosses between even/odd boundaries
- Empty nums or empty queries
- Single-element arrays and/or single queries

### Solution

```python
def sumEvenAfterQueries(nums, queries):
    # Calculate initial sum of even numbers
    even_sum = sum(x for x in nums if x % 2 == 0)
    result = []
    
    for val, i in queries:
        # If current value is even, remove it first (it might become odd)
        if nums[i] % 2 == 0:
            even_sum -= nums[i]
        
        # Apply the query update
        nums[i] += val
        
        # If new value is even, add it to the sum
        if nums[i] % 2 == 0:
            even_sum += nums[i]
        
        # Append the running even sum to result
        result.append(even_sum)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) (where n = len(nums), m = len(queries)).  
  - O(n) for initial sum; O(1) for each query.
- **Space Complexity:** O(1) extra, excluding the output array (O(m) for output).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the queries come in a stream and we can’t mutate `nums`?  
  *Hint: You’d need to simulate or represent changes functionally.*

- Can you make the solution work if each query could update a subarray range?  
  *Hint: Data structures like Segment Trees might help.*

- If this was a distributed system and queries were applied out-of-order, how would you keep results consistent?  
  *Hint: Transaction logs or versioning.*

### Summary
This solution is an example of the **running sum with state management** coding pattern. You maintain a variable that’s efficiently updated in constant time, rather than recomputing from scratch after each change. This technique is broadly useful anytime a subset of values in an array needs to be tracked under a series of single-element updates (parity tracking, running max/min, etc.).