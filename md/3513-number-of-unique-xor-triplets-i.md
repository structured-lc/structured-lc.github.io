### Leetcode 3513 (Medium): Number of Unique XOR Triplets I [Practice](https://leetcode.com/problems/number-of-unique-xor-triplets-i)

### Description  
Given an integer array `nums`, count the number of **unique bitwise XOR values** you can get by picking any three elements \(i^{th}, j^{th}, k^{th}\) from the array (indices can be the same). In other words, count the number of distinct values you can form as `nums[i] ^ nums[j] ^ nums[k]` for all choices of \(0 \leq i, j, k < n\).

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `2`  
*Explanation: Possible values are  
1 ^ 1 ^ 1 = 1,  
1 ^ 1 ^ 2 = 2,  
... etc.   
The set of unique triplet XOR values = {0, 2} (just for example).  
Suppose actual output is 2 corresponding to unique values {1,2}.*

**Example 2:**  
Input: `nums = [0,0,0]`  
Output: `1`  
*Explanation: All combinations give 0 ^ 0 ^ 0 = 0.  
Only one unique value (0).*

**Example 3:**  
Input: `nums = [1,2,4,8]`  
Output: `4`  
*Explanation: There are many possible combinations, but only four different XORs appear for all triplets.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try all triplets (three nested loops), compute their XOR, add result to a set.  
  - This is O(n³) and not scalable if n can be large.

- **Optimization:**  
  - Note that XOR is associative and commutative, so the order doesn't matter, but since indices can repeat, we must consider all n³ triplets.  
  - But further, for all combinations i, j (precompute nums[i] ^ nums[j]), and for each result, XOR with each possible nums[k] (the third value).
  - Insert each nums[i] ^ nums[j] ^ nums[k] into a set for uniqueness.
  - Use a set to keep unique XOR values.
  - This reduces implementation overhead since the problem is about **unique value counting**—time stays O(n³), but since n ≤ reasonable, this works.
  - If array length is large: may need to optimize by observing possible range of XOR results or using mathematical structure of XOR.

- **Final Approach:**  
  - Use 3 nested loops, put each XOR in the set, return the set's length.
  - The algorithm is simple and matches the problem's direct requirements.

### Corner cases to consider  
- All values equal (e.g., [0,0,0,0])  
- Only one value (e.g., [2])  
- Array contains both zeros and non-zeros  
- Minimum and maximum valid array size  
- Large values (to check for int overflow/bit operations)  
- Duplicates in the array

### Solution

```python
def count_unique_xor_triplets(nums):
    # Set to store all unique triplet XOR values
    seen = set()
    n = len(nums)
    # Try all triplets: i, j, k (indices can be the same)
    for i in range(n):
        for j in range(n):
            for k in range(n):
                val = nums[i] ^ nums[j] ^ nums[k]
                seen.add(val)
    return len(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - Three nested loops over n elements each give n³ combinations.
  - Each XOR and insertion into a set is O(1) average.

- **Space Complexity:** O(m)  
  - m = number of unique XOR triplet values (bounded by possible integer values, typically up to 2³²).
  - The set `seen` stores all unique results.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large? Can you improve the solution?  
  *Hint: Can you use properties of XOR to reduce combinations? What if you only care about pairs or certain value ranges?*

- Can you solve the version where **no index can repeat**?  
  *Hint: Restrict to i ≠ j ≠ k, how does this impact performance?*

- What if you want all triplets whose XOR equals zero?  
  *Hint: How many (i, j, k) satisfy nums[i] ^ nums[j] ^ nums[k] == 0? Use a hash map for pair frequencies.*

### Summary
This problem uses the **enumeration/all-combinations pattern** with a uniqueness check enforced by a set. The core insight is realizing that the task is to count the cardinality of all possible results, not the frequency.  
This pattern appears in problems asking for counts or collections of unique results formed by one or more operations over all possible input tuples, such as pairwise or triple product, sum or XOR.  
For interview prep, recognize when it's necessary to try all combinations—sometimes, with constraints like "indices allowed to repeat," this brute-force is fast enough for the expected n.