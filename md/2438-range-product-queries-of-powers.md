### Leetcode 2438 (Medium): Range Product Queries of Powers [Practice](https://leetcode.com/problems/range-product-queries-of-powers)

### Description  
Given an integer `n`, represent it as a sum of distinct powers of 2 (that is, as its binary representation).  
Create an array `powers` consisting of the powers of 2 that sum up to `n`, in increasing order.  
For each query `[left, right]`, return the product of `powers[left]` to `powers[right]`, modulo 1_000_000_007.  
You need to return an array with results for all queries.

### Examples  

**Example 1:**  
Input: `n = 15, queries = [[0,1],[2,2],[0,3]]`  
Output: `[2,8,240]`  
*Explanation: 15 in binary = 1111 → powers = [1,2,4,8].  
queries: 1×2 = 2  
queries[1]: 8  
queries[2]: 1×2×4×8 = 64*3+8=240 (this is actually step-by-step example, but for the problem, actual result is 1×2×4×8=64)*

**Example 2:**  
Input: `n = 10, queries = [[0,1]]`  
Output: ``  
*Explanation: 10 in binary = 1010 → powers = [2,8].  
queries: 2×8 = 16*

**Example 3:**  
Input: `n = 7, queries = [[0,0],[1,1],[2,2],[0,2]]`  
Output: `[1,2,4,8]`  
*Explanation: 7 in binary = 111 → powers = [1,2,4].  
queries: 1  
queries[1]: 2  
queries[2]: 4  
queries[3]: 1×2×4 = 8*

### Thought Process (as if you’re the interviewee)  
- First, represent `n` as the sum of distinct powers of 2 (extract which bits are set in its binary representation). For example, for n=10 (1010₂), we get [2,8].
- Store these powers in an array, sorted in increasing order of the bit positions.
- For each query [left, right], calculate the product of that subarray of `powers`. Since the output may be very large, take modulo 1,000,000,007 at each multiplication.
- Brute force: extract powers, then for each query compute the product. This is efficient since the number of bits set in `n` is at most 30 (for 32-bit integers). Each query is at most O(30) time.
- We can precompute prefix products for `powers` to answer each query in O(1), but since there are at most 30-32 items, iteratively computing for each query is fast enough.
- I’ll proceed with bit manipulation to get `powers`, then loop through each query for their product.

### Corner cases to consider  
- `n` is a power of 2 (e.g., 4): `powers` contains only one number.
- Query with left == right.
- Query spans the full array (e.g., [0, len(powers) - 1]).
- High bit values (e.g., n is large, like 2³⁰).
- Duplicate queries, empty queries array.

### Solution

```python
def productQueries(n, queries):
    MOD = 10**9 + 7
    powers = []
    bit = 0
    # Extract all powers of 2 that sum to n
    while n > 0:
        if n & 1:
            powers.append(1 << bit)
        n >>= 1
        bit += 1
    
    ans = []
    for l, r in queries:
        result = 1
        for i in range(l, r + 1):
            result = (result * powers[i]) % MOD
        ans.append(result)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q × k), where q = number of queries, k = up to 30 (the number of powers of 2). This is because for each query, we can have up to 30 multiplications.
- **Space Complexity:** O(k + q), where k = number of set bits in n (powers array), and q = size of answer array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the queries array was extremely large (e.g., 10⁵+)?
  *Hint: Precompute prefix products so each query can be answered in O(1).*

- What if we wanted the sum instead of the product for each query?
  *Hint: Use prefix sums instead of products.*

- Could you do this for arbitrary bases instead of powers of 2?
  *Hint: Generalize the method for extracting terms representing n in the required base.*

### Summary
This problem uses classic **bit manipulation** to find subset powers of 2 that sum up to `n` (“power decomposition”), and then processes *range product queries* over that list. The brute-force approach is already efficient, but for many queries, prefix product precomputation (array: prefix[i] = powers×…×powers[i]) applies the “range query with preprocessing” pattern. This method recurs in similar problems, such as range sum or product queries on special decomposed arrays.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
