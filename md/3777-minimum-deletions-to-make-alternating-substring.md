### Leetcode 3777 (Hard): Minimum Deletions to Make Alternating Substring [Practice](https://leetcode.com/problems/minimum-deletions-to-make-alternating-substring)

### Description  
You are given a string s of length n consisting of 'a' and 'b', and q queries. Each query is either type 1 j (flip s[j] from 'a' to 'b' or vice versa) or type 2 l r (compute the minimum deletions needed to make substring s[l..r] alternating, where alternating means no two adjacent characters are equal; length 1 is always alternating). Return an array of answers for all type 2 queries.

### Examples  

**Example 1:**  
Input: `s = "aba", queries = [[0,2],[1,0],[1,2]]`  
Output: `[2]`  
*Explanation: Initial s="aba". Query 1 0 flips s → "bba" (bad pairs at 0-1,1-2). Query 1 2 flips s[2] → "bbb" (bad pairs at 0-1,1-2). Query 2 0 2 needs 2 deletions (e.g., delete s[1] and s[2] → "b").*

**Example 2:**  
Input: `s = "aab", queries = [[1,1]]`  
Output: `[]`  
*Explanation: Only flip query at index 1 → "aab" becomes "aab" wait no, flip 'a' to 'b' → "abb". No type 2 queries, so empty answer.*

**Example 3:**  
Input: `s = "aaa", queries = [[2,0,2]]`  
Output: `[2]`  
*Explanation: s="aaa" has bad pairs at 0-1 and 1-2. Minimum deletions=2 (delete two chars → "a", which is alternating).*

### Thought Process (as if you’re the interviewee)  
First, brute force: for each type 2 query, scan l to r-1 counting positions i where s[i]==s[i+1]; that's the min deletions since each bad pair requires deleting at least one char, and deletions resolve adjacent bads independently. But with n,q≤1e5, O(q*n) is too slow.  
Observe: min deletions for substring l..r = count of i in [l,r-1] where s[i]==s[i+1]. Flip queries change s[j], affecting at most two bad-pair positions: j-1 and j.  
Optimize: maintain a Fenwick Tree or Segment Tree (BIT) over array bad[0..n-2] where bad[i]=1 if s[i]==s[i+1] else 0. Type 2: query sum bad[l..r-1]. Type 1: flip s[j], recompute bad[j-1] (if j>0) and bad[j] (if j<n-1), update BIT at those positions. O((n+q)log n) time. BIT chosen for simplicity over naive prefix sums (updates would be O(n)).

### Corner cases to consider  
- n=1: no bad pairs possible; type 2 l=r always 0.  
- All chars same (e.g., "aaa"): bad[i]=1 for all i; deletions = r-l.  
- Already alternating (e.g., "abab"): all bad[i]=0; deletions=0.  
- Flip at ends: j=0 only affects bad; j=n-1 only affects bad[n-2].  
- Single query or q=0: handle empty answer array.  
- l=r: always 0 (length 1 alternating).

### Solution

```python
class FenwickTree:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1)
    
    def update(self, idx, delta):
        idx += 1  # 1-based
        while idx <= self.size:
            self.tree[idx] += delta
            idx += idx & -idx
    
    def query(self, idx):
        idx += 1  # 1-based
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= idx & -idx
        return res
    
    def range_query(self, left, right):
        return self.query(right) - self.query(left - 1)

def minimumDeletions(s: str, queries: list[list[int]]) -> list[int]:
    n = len(s)
    if n == 0:
        return []
    
    s = list(s)  # mutable
    bad = [0] * (n - 1)
    ft = FenwickTree(n - 1)
    
    # Build initial bad array and FT
    for i in range(n - 1):
        bad[i] = 1 if s[i] == s[i + 1] else 0
        ft.update(i, bad[i])
    
    ans = []
    for q in queries:
        tp = q[0]
        if tp == 1:
            # Flip
            j = q[1]
            s[j] = 'b' if s[j] == 'a' else 'a'
            
            # Update bad[j-1] if exists
            if j > 0:
                old_bad = bad[j - 1]
                new_bad = 1 if s[j - 1] == s[j] else 0
                delta = new_bad - old_bad
                bad[j - 1] = new_bad
                ft.update(j - 1, delta)
            
            # Update bad[j] if exists
            if j < n - 1:
                old_bad = bad[j]
                new_bad = 1 if s[j] == s[j + 1] else 0
                delta = new_bad - old_bad
                bad[j] = new_bad
                ft.update(j, delta)
        
        else:
            # Type 2: query sum bad[l..r-1]
            l, r = q[1], q[2]
            if l >= r:
                ans.append(0)
            else:
                ans.append(ft.range_query(l, r - 1))
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + q) log n): O(n log n) to build FT initially; each of q queries is O(log n) for update (≤2 positions) or range query.
- **Space Complexity:** O(n) for Fenwick Tree, bad array, and mutable s list.

### Potential follow-up questions (as if you’re the interviewer)  

- (What if flips are frequent and queries are rare? Would a different data structure like sqrt decomposition be better?)  
  *Hint: Analyze update/query frequencies; sqrt(n) blocks give O(sqrt(n)) per op for amortized balance.*

- (Extend to 26 lowercase letters: min deletions to make substring have no adjacent equal chars.)  
  *Hint: bad[i] still just checks s[i] != s[i+1]; no change needed.*

- (What if queries include modifications like "set s[j]='a'" instead of flip?)  
  *Hint: Track previous char value before update to compute delta accurately.*

### Summary
Transform problem to counting "bad pairs" (adjacent equal chars) in ranges using a Fenwick Tree for O(log n) updates/queries on flips and range sums. Classic range update + query pattern (like BIT/Fenwick for subarray sums with point updates), also applies to problems like range XOR or frequency queries with modifications.

### Flashcard
Track "bad pairs" (adjacent equal chars) in a Fenwick Tree: flips affect ≤2 positions (update deltas), type 2 queries sum range [l, r-1] for min deletions. O((n+q) log n) handles 1e5 constraints efficiently.

### Tags
String(#string), Segment Tree(#segment-tree)

### Similar Problems
