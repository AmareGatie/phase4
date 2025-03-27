### Database Design (8 Questions)

1. **Q:** Explain your database schema design with a focus on how you optimized for read vs. write operations.
   **A:** "We designed a normalized schema for write efficiency (3NF) but added strategic denormalization for read performance. For writes: Tables are highly normalized to minimize update anomalies. For reads: We created summary tables (e.g., question_answer_counts) that are updated via triggers. We implemented indexing on: 1) Frequently queried columns (question_id, user_id), 2) Sorted outputs (created_at), and 3) Full-text search columns (question_text). Partitioning is by date ranges for historical data. We used InnoDB for its row-level locking during concurrent writes."

   **Panelist Feedback:**
   ✔ "Excellent consideration of read/write tradeoffs"
   ✔ "Good use of both normalization and denormalization"
   ⚠ "How would you handle the trigger overhead at scale?"
   ⚠ "Consider explaining your index maintenance strategy"

2. **Q:** How does your schema support the hierarchical relationship between questions and answers?
   **A:** "We implemented a closure table pattern for the hierarchical data. The answers table has: 1) answer_id PK, 2) question_id FK, 3) parent_answer_id for threaded replies, 4) path_string (e.g., '1/4/7') for easy ancestor queries. This allows efficient: 1) Retrieval of all answers for a question, 2) Nested comment threading, 3) Calculating comment depths. We added a depth column for easy top-level answer filtering. The path implementation uses triggers to maintain integrity during updates/deletes."

   **Panelist Feedback:**
   ✔ "Sophisticated hierarchical data handling"
   ✔ "Good use of path enumeration pattern"
   ⚠ "How would you optimize for deeply nested threads?"
   ⚠ "Consider materialized paths for read-heavy scenarios"

### API Design (8 Questions)

3. **Q:** Detail your REST API versioning strategy and how you would handle breaking changes.
   **A:** "We implemented URL path versioning (/v1/questions) with semantic versioning principles. For non-breaking changes (adding fields): We extend the schema while maintaining backward compatibility. For breaking changes: 1) Maintain the old version for 6 months, 2) Create /v2 endpoint, 3) Use API gateway routing, 4) Provide migration guides. We include API version in: 1) URL, 2) Accept header, 3) Response metadata. All responses include deprecation warnings when endpoints will be sunset. We log version usage to inform retirement timelines."

   **Panelist Feedback:**
   ✔ "Professional versioning approach"
   ✔ "Good consideration of developer experience"
   ⚠ "How would you communicate changes to API consumers?"
   ⚠ "Consider canary releasing new versions"

4. **Q:** Explain your pagination implementation and how you optimized for large datasets.
   **A:** "We implemented cursor-based pagination using: 1) A composite cursor (created_at + id), 2) WHERE created_at <= ? AND id < ? ordering, 3) Limit of 50 records per page. This avoids the performance pitfalls of OFFSET with large datasets. The API returns: 1) The data subset, 2) next_cursor value, 3) total_count (from cached values). Clients request subsequent pages by passing the cursor. For the first page, we use a default cursor value. We added covering indexes to support the pagination queries without table scans."

   **Panelist Feedback:**
   ✔ "Excellent use of cursor pagination"
   ✔ "Good performance optimizations"
   ⚠ "How do you handle real-time data insertion affecting pagination?"
   ⚠ "Consider adding page number alternatives for simple cases"

### Authentication & Security (6 Questions)

5. **Q:** Describe your JWT implementation in detail, including refresh token strategy.
   **A:** "We use a dual-token approach: 1) Short-lived (15min) access token in memory, 2) Long-lived (7d) refresh token in HttpOnly cookie. The access token contains: user_id, roles, and issued_at. Refresh tokens are: 1) Stored hashed in database, 2) Single-use, 3) Rotated on each refresh. Our flow: 1) Login returns both tokens, 2) Client uses access token until expiry, 3) Silent auth via refresh token endpoint, 4) Logout invalidates both tokens. We implemented token replay prevention via jti claims and a token blacklist. All tokens are signed with RS256 asymmetric encryption."

   **Panelist Feedback:**
   ✔ "Comprehensive token security"
   ✔ "Proper use of token rotation"
   ⚠ "How would you handle token revocation across microservices?"
   ⚠ "Consider adding device fingerprinting to refresh tokens"

6. **Q:** How did you secure your API against common web vulnerabilities?
   **A:** "We implemented defense in depth: 1) Input validation with express-validator, 2) Parameterized queries only, 3) Helmet middleware for security headers (CSP, XSS), 4) Rate limiting (100req/min), 5) CSRF tokens for state-changing operations. Specific protections: SQLi - type-safe ORM, XSS - output encoding + DOMPurify, IDOR - resource ownership checks, DoS - request size limits. We conducted manual penetration testing focusing on OWASP Top 10. All endpoints require Content-Type headers to prevent MIME sniffing. Sensitive operations require re-authentication."

   **Panelist Feedback:**
   ✔ "Thorough security implementation"
   ✔ "Good OWASP coverage"
   ⚠ "How would you monitor for new vulnerabilities?"
   ⚠ "Consider implementing security headers at the proxy level"

### Frontend Architecture (8 Questions)

7. **Q:** Explain your state management architecture and why you chose this approach.
   **A:** "We implemented a layered state management strategy: 1) Local component state for UI state (forms, modals), 2) React Context for global app state (auth, theme), 3) Custom hooks (useQuestions, useAnswers) for data fetching, 4) SWR for client-side caching. We avoided Redux because: 1) Our global state needs were minimal, 2) Context + useReducer provided sufficient capabilities, 3) We wanted to minimize boilerplate. State updates follow immutable patterns. We implemented optimistic updates for mutations to improve perceived performance. All state is typed with TypeScript interfaces."

   **Panelist Feedback:**
   ✔ "Well-reasoned architecture"
   ✔ "Good use of modern React patterns"
   ⚠ "How would you adapt this if state needs grew significantly?"
   ⚠ "Consider adding state persistence for page refreshes"

8. **Q:** Detail your approach to responsive design and cross-browser compatibility.
   **A:** "We followed a mobile-first responsive strategy: 1) Fluid typography with clamp(), 2) Flexible layouts with CSS Grid + Flexbox, 3) Responsive images with srcset + picture. Breakpoints at 320px, 768px, 1024px. For browser support: 1) Autoprefixer for CSS vendor prefixes, 2) Babel transpilation, 3) Polyfills for critical features. We implemented progressive enhancement - core functionality works without JavaScript. Testing included: 1) BrowserStack for real devices, 2) LambdaTest for legacy browsers, 3) Manual testing on key devices. We used feature queries (@supports) for graceful degradation."

   **Panelist Feedback:**
   ✔ "Comprehensive responsive approach"
   ✔ "Excellent cross-browser strategy"
   ⚠ "How would you handle browser-specific bugs?"
   ⚠ "Consider implementing a browser support matrix"

### Performance Optimization (6 Questions)

9. **Q:** Describe your frontend performance optimization techniques.
   **A:** "We implemented multiple optimizations: 1) Code splitting with React.lazy + Suspense, 2) Bundle analysis with Webpack Bundle Analyzer, 3) Tree-shaking for unused code, 4) Lazy loading for below-the-fold components, 5) Image optimization (WebP + compression), 6) Font subsetting. We used: 1) IntersectionObserver for lazy loading, 2) requestIdleCallback for non-urgent work, 3) Web Workers for heavy computations. Critical CSS is inlined. We preload key resources and prefetch likely navigation targets. All optimizations are measured with Lighthouse audits."

   **Panelist Feedback:**
   ✔ "Impressive range of optimizations"
   ✔ "Good use of modern browser APIs"
   ⚠ "How would you prioritize these optimizations?"
   ⚠ "Consider implementing PRPL pattern"

10. **Q:** Explain your backend caching strategy for frequently accessed data.
    **A:** "We implemented a multi-layer caching approach: 1) Redis for hot data (questions, answers), 2) Database-level query caching, 3) HTTP caching headers (ETag, Last-Modified). Cache invalidation strategies: 1) Time-based (5min TTL) for listings, 2) Write-through for user-specific data, 3) Manual invalidation on updates. Cache keys include: resource ID + last_updated timestamp. We use cache stampede protection via: 1) Locking during recomputation, 2) Background refresh. Hot questions are pre-warmed into cache. Cache metrics are monitored to guide sizing decisions."

    **Panelist Feedback:**
    ✔ "Sophisticated caching implementation"
    ✔ "Good invalidation strategies"
    ⚠ "How would you handle cache consistency across instances?"
    ⚠ "Consider adding cache tiering for very hot items"

### Deployment & DevOps (4 Questions)

11. **Q:** Detail your CI/CD pipeline and deployment strategy.
    **A:** "Our pipeline has 4 stages: 1) Build (Docker image creation), 2) Test (unit + integration), 3) Staging (smoke tests), 4) Production (canary rollout). Infrastructure is defined as code using Terraform. Deployment process: 1) Feature branches trigger preview deployments, 2) Merge to main builds release candidate, 3) Automated canary release to 5% of users, 4) Full rollout after 1hr monitoring. Rollback is automated if error rates exceed thresholds. We use feature flags for gradual feature enabling. All deployments are immutable - new versions get fresh infrastructure."

    **Panelist Feedback:**
    ✔ "Professional-grade deployment pipeline"
    ✔ "Excellent use of progressive delivery"
    ⚠ "How do you handle database migrations in this flow?"
    ⚠ "Consider adding blue-green deployments for critical services"

12. **Q:** How is your application monitored in production?
    **A:** "We implemented comprehensive observability: 1) Metrics (Prometheus) for API response times, error rates, 2) Distributed tracing (Jaeger) for request flows, 3) Structured logging (ELK) with correlation IDs, 4) Real-user monitoring (RUM) for frontend. Alerts are configured for: 1) Error spikes, 2) Latency degradation, 3) Resource saturation. We use synthetic monitoring for key user journeys. Dashboards show: 1) System health, 2) Business metrics (questions posted), 3) Performance trends. Logs are retained for 30 days with sensitive data redacted."

    **Panelist Feedback:**
    ✔ "Comprehensive monitoring setup"
    ✔ "Good mix of technical and business metrics"
    ⚠ "How would you detect and diagnose memory leaks?"
    ⚠ "Consider adding anomaly detection for metrics"

### Scalability (4 Questions)

13. **Q:** How would you scale this application to handle 10x more traffic?
    **A:** "Horizontal scaling strategy: 1) Stateless API servers behind load balancer, 2) Read replicas for database, 3) Redis cluster for distributed caching. Architectural changes: 1) Implement message queue (Kafka) for write-heavy operations, 2) Shard database by user geography, 3) Edge caching for static assets. Optimization targets: 1) Database connection pooling, 2) Batch processing for notifications, 3) Client-side data expiration. We would implement autoscaling based on CPU/memory metrics with warm pools for sudden spikes. Critical users would get priority routing."

    **Panelist Feedback:**
    ✔ "Well-considered scaling plan"
    ✔ "Good separation of read/write concerns"
    ⚠ "How would you manage distributed transactions?"
    ⚠ "Consider adding circuit breakers for dependent services"

14. **Q:** Explain how you would implement real-time updates to questions/answers.
    **A:** "We would use WebSockets with the following architecture: 1) Dedicated WebSocket server, 2) Redis Pub/Sub for message broadcasting, 3) Client-side subscription manager. Implementation steps: 1) Establish persistent WebSocket connection, 2) Subscribe to question-specific channels, 3) Server publishes updates to Redis on changes, 4) Messages are pushed to connected clients. Optimization techniques: 1) Binary protocol for efficiency, 2) Connection multiplexing, 3) Exponential backoff for reconnects. We would implement presence tracking to show active users. Fallback to long polling for unsupported clients."

    **Panelist Feedback:**
    ✔ "Solid real-time architecture"
    ✔ "Good consideration of fallback strategies"
    ⚠ "How would you handle message ordering guarantees?"
    ⚠ "Consider adding read receipts for Q&A scenarios"

This expanded format provides deeper technical examination while maintaining clear structure for evaluation. Each answer demonstrates comprehensive system understanding while highlighting areas for potential improvement.
