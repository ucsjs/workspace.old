export interface UcsInterface {
    OnApplicationStart(): void | Promise<void>;
    Awake?(): void|Promise<void>;
    OnEnable?(): void|Promise<void>;
    Reset?(): void|Promise<void>;
    Start?(): void|Promise<void>;
    Update?(): void|Promise<void>;
    LateUpdate?(): void|Promise<void>;
    OnApplicationPause?(): void|Promise<void>;
    OnApplicationQuit?(): void|Promise<void>;
    OnDisable?(): void|Promise<void>;
    OnDestroy?(): void|Promise<void>;
    OnException?(): void|Promise<void>;
}