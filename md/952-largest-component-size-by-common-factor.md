### Leetcode 952 (Hard): Largest Component Size by Common Factor [Practice](https://leetcode.com/problems/largest-component-size-by-common-factor)

### Description  
Given an array of **unique positive integers** `nums`, treat each integer as a node in a graph. Draw an undirected edge between two nodes if the numbers share a **common factor greater than 1**. Your task is to return the size of the largest *connected component* in this graph — that is, the largest set of numbers that are all inter-connected via shared factors.

### Examples  

**Example 1:**  
Input: `nums = [4,6,15,35]`  
Output: `4`  
*Explanation: Each pair shares at least one common factor as follows: 4 and 6 share 2, 6 and 15 share 3, 15 and 35 share 5. Thus, the whole array forms one connected component of size 4.*

**Example 2:**  
Input: `nums = [20,50,9,63]`  
Output: `2`  
*Explanation: 20 and 50 share factor 10, 9 and 63 share factor 9 or 3. No connection between the groups. The largest connected component size is 2.*

**Example 3:**  
Input: `nums = [2,3,6,7,4,12,21,39]`  
Output: `8`  
*Explanation: All elements share factors that ultimately connect them together (directly or through intermediate numbers). So, the component size is 8.*

### Thought Process (as if you’re the interviewee)  

- **Initial brute force:**  
  - For every pair `(i, j)`, check if `gcd(nums[i], nums[j]) > 1` and try to build the connections.
  - This would be O(n² × log(max(nums))) — not feasible for n up to 20,000.

- **Graph abstraction:**  
  - Each number is a node; draw an edge if two numbers share a common factor (>1).
  - Need an efficient way to group numbers sharing at least one factor.

- **Union-Find (Disjoint Set Union) Optimization:**  
  - Use Union-Find to group numbers by their prime factors.
  - For each number, factorize it, and union the number with each of its factors.
  - For all numbers sharing a factor, they’ll be grouped together in the same connected component.

- **Counting:**  
  - After all unions, for each number, find its representative (root parent).
  - Count the size of each group; the largest one is the answer.

- **Trade-offs:**  
  - Union-Find with path compression and union by rank is efficient.
  - Factorization for each number up to 100,000 is manageable.
  - Avoid building an explicit n × n graph.

### Corner cases to consider  
- Empty `nums` array (problem constraints guarantee at least one element).
- Only one element: answer is 1.
- All numbers are prime: each number is its own component.
- All numbers are multiples of the same number: whole array is one component.
- Two groups of numbers that do not share any factors.

### Solution

```python
def largestComponentSize(nums):
    # Helper to find all prime factors of a number
    def get_factors(x):
        factors = set()
        d = 2
        while d * d <= x:
            if x % d == 0:
                factors.add(d)
                while x % d == 0:
                    x //= d
            d += 1
        if x > 1:
            factors.add(x)
        return factors

    # Union Find initialization
    parent = {}
    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]
    def union(x, y):
        parent.setdefault(x, x)
        parent.setdefault(y, y)
        px, py = find(x), find(y)
        if px != py:
            parent[px] = py

    # For each number, union all its factors with the number
    for num in nums:
        for factor in get_factors(num):
            union(num, factor)

    # Count the number of elements in each connected component (by their root)
    count = {}
    res = 0
    for num in nums:
        root = find(num)
        count[root] = count.get(root, 0) + 1
        res = max(res, count[root])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each number up to 10⁵, prime factorization takes up to O(√x) time (but for most numbers, factors split quickly).
  - Each union and find is near-constant time due to path compression (O(α(n)), very slow-growing).
  - Overall: O(n × √M), where M = max(nums).
- **Space Complexity:**  
  - O(n + M), for Union-Find parent mapping and factors.

### Potential follow-up questions (as if you’re the interviewer)  

- If `nums` contains duplicates, how does your approach change?  
  *Hint: Consider if unioning the same value multiple times affects your result.*

- What if `nums` can be up to 10⁷ in size?  
  *Hint: Think about optimized Sieve for factorization or alternate grouping.*

- If we want the actual component(s), not just the size, how do we output the elements?  
  *Hint: Track the grouping by root and collect the original numbers.*

### Summary
This problem is a classic use-case for the **Union-Find (Disjoint Set Union)** data structure, combined with **number theory** (prime factorization). The approach groups numbers via common prime factors and leverages efficient set operations to answer connectivity queries. This is a common coding pattern for problems involving dynamic grouping and connected components, and arises in problems involving **graph connectivity, clustering, and network analysis**.