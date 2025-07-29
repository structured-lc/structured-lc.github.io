### Leetcode 440 (Hard): K-th Smallest in Lexicographical Order [Practice](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order)

### Description  
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

### Examples  

**Example 1:**  
Input: `n = 13, k = 2`  
Output: `10`  
*Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.*

**Example 2:**  
Input: `n = 1, k = 1`  
Output: `1`  

### Thought Process (as if you're the interviewee)  
This problem requires understanding lexicographical ordering of numbers. When numbers are sorted lexicographically, they follow dictionary order as strings, not numerical order.

Key insights:
1. **Trie structure**: Numbers can be viewed as a 10-ary trie where each digit represents a child
2. **DFS traversal**: Lexicographical order corresponds to DFS traversal of this trie
3. **Efficient counting**: Instead of generating all numbers, count how many numbers exist in subtrees

Approaches:
1. **Generate and sort**: Create all numbers, sort lexicographically - O(n log n)
2. **DFS simulation**: Simulate DFS traversal without building the trie - O(log²n)
3. **Mathematical counting**: Calculate subtree sizes mathematically - O(log²n)

The mathematical approach with subtree counting is most efficient.

### Corner cases to consider  
- k = 1 (first element)
- k = n (last element)
- n is a power of 10
- Single digit n
- Large n values
- k larger than available numbers

### Solution

```python
def findKthNumber(n, k):
    def count_steps(prefix, n):
        """Count how many numbers exist between prefix and prefix+1 that are <= n."""
        steps = 0
        first = prefix
        last = prefix
        
        while first <= n:
            # Count numbers in current level
            steps += min(n + 1, last + 1) - first
            
            # Move to next level
            first *= 10
            last = last * 10 + 9
        
        return steps
    
    current = 1
    k -= 1  # Convert to 0-indexed
    
    while k > 0:
        steps = count_steps(current, n)
        
        if steps <= k:
            # Skip entire subtree rooted at current
            k -= steps
            current += 1
        else:
            # Go deeper into current subtree
            current *= 10
            k -= 1
    
    return current

# Alternative implementation with clearer variable names
def findKthNumberClear(n, k):
    def count_numbers_with_prefix(prefix, limit):
        """Count how many numbers <= limit start with the given prefix."""
        count = 0
        lower_bound = prefix
        upper_bound = prefix
        
        while lower_bound <= limit:
            # Add count of numbers in current range
            count += min(limit + 1, upper_bound + 1) - lower_bound
            
            # Expand to next level (add one more digit)
            lower_bound *= 10
            upper_bound = upper_bound * 10 + 9
        
        return count
    
    current_prefix = 1
    position = k - 1  # Convert to 0-indexed
    
    while position > 0:
        # Count numbers starting with current_prefix
        subtree_size = count_numbers_with_prefix(current_prefix, n)
        
        if subtree_size <= position:
            # Move to next sibling
            position -= subtree_size
            current_prefix += 1
        else:
            # Go deeper (add digit to prefix)
            current_prefix *= 10
            position -= 1  # Account for current_prefix itself
    
    return current_prefix

# Recursive approach for better understanding
def findKthNumberRecursive(n, k):
    def count_with_prefix(prefix, n):
        """Count numbers with given prefix that are <= n."""
        if prefix > n:
            return 0
        
        count = 0
        current = prefix
        next_prefix = prefix + 1
        
        while current <= n:
            # Count numbers in current level
            count += min(n + 1, next_prefix) - current
            
            # Move to next level
            current *= 10
            next_prefix *= 10
        
        return count
    
    def find_kth(prefix, k, n):
        """Find kth number starting with prefix."""
        if k == 1:
            return prefix
        
        # Check each possible next digit
        for digit in range(10):
            if prefix == 0 and digit == 0:
                continue  # Skip leading zeros
            
            new_prefix = prefix * 10 + digit
            if new_prefix > n:
                break
            
            count = count_with_prefix(new_prefix, n)
            
            if count >= k:
                return find_kth(new_prefix, k, n)
            else:
                k -= count
        
        return -1  # Should not reach here
    
    return find_kth(0, k, n)

# Iterative DFS simulation
def findKthNumberDFS(n, k):
    def get_count(prefix, n):
        """Get count of numbers with prefix <= n."""
        count = 0
        cur = prefix
        next_cur = prefix + 1
        
        while cur <= n:
            count += min(n + 1, next_cur) - cur
            cur *= 10
            next_cur *= 10
        
        return count
    
    cur = 1
    k -= 1
    
    while k > 0:
        count = get_count(cur, n)
        
        if count <= k:
            # Move to next sibling
            k -= count
            cur += 1
        else:
            # Move to first child
            cur *= 10
            k -= 1
    
    return cur

# Brute force approach for small inputs (for verification)
def findKthNumberBruteForce(n, k):
    numbers = [str(i) for i in range(1, n + 1)]
    numbers.sort()  # Lexicographical sort
    return int(numbers[k - 1])

# Step-by-step simulation approach
def findKthNumberSimulation(n, k):
    def next_number(current, n):
        """Find next number in lexicographical order."""
        # Try to go deeper (multiply by 10)
        if current * 10 <= n:
            return current * 10
        
        # Try to increment last digit
        if current + 1 <= n and (current + 1) % 10 != 0:
            return current + 1
        
        # Backtrack and increment
        current //= 10
        while current > 0:
            if (current + 1) % 10 != 0 and (current + 1) * 10 <= n:
                return (current + 1) * 10
            if current + 1 <= n:
                return current + 1
            current //= 10
        
        return -1
    
    current = 1
    for _ in range(k - 1):
        current = next_number(current, n)
        if current == -1:
            break
    
    return current

# Helper function to visualize the trie structure
def visualize_lexicographical_order(n):
    """Helper function to see the lexicographical order."""
    numbers = [str(i) for i in range(1, n + 1)]
    numbers.sort()
    return [int(x) for x in numbers]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log²n) where the first log factor comes from the number of levels in the trie (digits in n) and the second log factor comes from counting steps at each level.
- **Space Complexity:** O(log n) for the recursion stack or O(1) for the iterative approach.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to find the kth largest instead of kth smallest?  
  *Hint: Reverse the traversal order or traverse the trie in reverse order.*

- What if we needed to find all numbers in a specific lexicographical range [start, end]?  
  *Hint: Use similar counting logic but with range bounds instead of single target.*

- How would you handle the case where numbers could have leading zeros?  
  *Hint: Modify the counting logic to account for different number representations.*

- Can you optimize this further for repeated queries with different k values but same n?  
  *Hint: Precompute subtree sizes or build a more sophisticated index structure.*

### Summary
This problem demonstrates the power of mathematical counting and trie traversal simulation. The key insight is recognizing that lexicographical order corresponds to a depth-first traversal of a 10-ary trie, and instead of building the trie explicitly, we can count subtree sizes mathematically. This pattern is useful in problems involving ordered structures, counting combinatorics, and efficient traversal of implicit tree structures. Understanding how to count elements in lexicographical ranges is fundamental for many string processing and ordering problems.
